import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { Prisma } from '@prisma/client';

const router = Router();

// GET /api/colleges
router.get('/', async (req: Request, res: Response) => {
  try {
    const search = (req.query.search as string) || '';
    const state = (req.query.state as string) || '';
    const minFees = parseInt((req.query.minFees as string) || '0');
    const maxFees = parseInt((req.query.maxFees as string) || '10000000');
    const course = (req.query.course as string) || '';
    const page = parseInt((req.query.page as string) || '1');
    const limit = parseInt((req.query.limit as string) || '12');
    const sort = (req.query.sort as string) || 'rating';

    const where: Prisma.CollegeWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { city: { contains: search } },
        { state: { contains: search } },
      ];
    }

    if (state) {
      where.state = { equals: state };
    }

    if ((minFees && minFees > 0) || (maxFees && maxFees < 10000000)) {
      where.fees = { gte: minFees || 0, lte: maxFees || 10000000 };
    }

    if (course) {
      where.courses = {
        some: { name: { contains: course } },
      };
    }

    let orderBy: Prisma.CollegeOrderByWithRelationInput = {};
    switch (sort) {
      case 'fees-low':
        orderBy = { fees: 'asc' };
        break;
      case 'fees-high':
        orderBy = { fees: 'desc' };
        break;
      case 'placement':
        orderBy = { placementRate: 'desc' };
        break;
      case 'rating':
      default:
        orderBy = { rating: 'desc' };
        break;
    }

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          courses: true,
        },
      }),
      prisma.college.count({ where }),
    ]);

    res.json({
      colleges: colleges.map((c) => ({
        ...c,
        topRecruiter: c.topRecruiter ? c.topRecruiter.split(',') : [],
        courses: c.courses || [],
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({
      error: 'Failed to fetch colleges',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/colleges/:slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const college = await prisma.college.findUnique({
      where: { slug },
      include: {
        courses: true,
        reviews: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!college) {
      res.status(404).json({ error: 'College not found' });
      return;
    }

    const related = await prisma.college.findMany({
      where: {
        state: college.state,
        id: { not: college.id },
      },
      take: 4,
      orderBy: { rating: 'desc' },
    });

    res.json({
      ...college,
      topRecruiter: college.topRecruiter ? college.topRecruiter.split(',') : [],
      related: related.map((r) => ({
        ...r,
        topRecruiter: r.topRecruiter ? r.topRecruiter.split(',') : [],
      })),
    });
  } catch (error) {
    console.error('Error fetching college:', error);
    res.status(500).json({ error: 'Failed to fetch college' });
  }
});

export default router;
