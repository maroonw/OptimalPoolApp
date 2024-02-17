import express from 'express';
import Category from '../../models/category.model.js';
import Thread from '../../models/thread.model.js';

const router = express.Router();

// Route to get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// Route to get top threads in a category
router.get('/:categoryId/threads/top', async (req, res) => {
  const { categoryId } = req.params;
  const { limit } = req.query;
  try {
    const threads = await Thread.find({ categoryId })
      .sort({ repliesCount: -1 })
      .limit(parseInt(limit));
    res.json({ threads });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top threads' });
  }
});

router.post('/:categoryId/threads', async (req, res) => {
  try {
    const { title, content } = req.body;
    const categoryId = req.params.categoryId;

    const newThread = new Thread({
      title,
      content,
      categoryId,
    });

    await newThread.save();
    res.status(201).json(newThread);
  } catch (error) {
    res.status(500).json({ message: 'Error creating thread' });
  }
});

export default router;

