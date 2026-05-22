import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// GET /api/saved
router.get('/', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const [savedColleges, savedComparisons] = await Promise.all([
      prisma.savedCollege.findMany({
        where: { userId },
        include: {
          college: {
            include: { courses: true },
          },
        },
        orderBy: { id: 'desc' },
      }),
      prisma.savedComparison.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    res.json({
      savedColleges: savedColleges.map((s) => ({
        ...s,
        college: {
          ...s.college,
          topRecruiter: s.college.topRecruiter ? s.college.topRecruiter.split(',') : [],
        },
      })),
      savedComparisons: savedComparisons.map((s) => ({
        ...s,
        collegeIds: s.collegeIds ? s.collegeIds.split(',') : [],
      })),
    });
  } catch (error) {
    console.error('Error fetching saved items:', error);
    res.status(500).json({ error: 'Failed to fetch saved items' });
  }
});

// POST /api/saved
router.post('/', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const body = req.body;

    if (body.type === 'comparison') {
      const comparison = await prisma.savedComparison.create({
        data: {
          userId,
          collegeIds: body.collegeIds.join(','),
          name: body.name,
        },
      });
      res.status(201).json(comparison);
      return;
    }

    const { collegeId } = body;
    if (!collegeId) {
      res.status(400).json({ error: 'College ID is required' });
      return;
    }

    const saved = await prisma.savedCollege.upsert({
      where: {
        userId_collegeId: { userId, collegeId },
      },
      update: {},
      create: { userId, collegeId },
    });

    res.status(201).json(saved);
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ error: 'Failed to save item' });
  }
});

// DELETE /api/saved/:collegeId
router.delete('/:collegeId', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { collegeId } = req.params;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    await prisma.savedCollege.delete({
      where: {
        userId_collegeId: {
          userId,
          collegeId,
        },
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting saved college:', error);
    res.status(500).json({ error: 'Failed to remove saved college' });
  }
});

export default router;
