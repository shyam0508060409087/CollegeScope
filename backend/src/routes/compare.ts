import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// POST /api/compare
router.post('/', async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      res.status(400).json({ error: 'Please provide an array of college IDs' });
      return;
    }

    if (ids.length > 3) {
      res.status(400).json({ error: 'Maximum 3 colleges can be compared' });
      return;
    }

    const colleges = await prisma.college.findMany({
      where: { id: { in: ids } },
      include: { courses: true },
    });

    res.json(
      colleges.map((c) => ({
        ...c,
        topRecruiter: c.topRecruiter ? c.topRecruiter.split(',') : [],
      }))
    );
  } catch (error) {
    console.error('Error fetching comparison:', error);
    res.status(500).json({ error: 'Failed to fetch colleges for comparison' });
  }
});

export default router;
