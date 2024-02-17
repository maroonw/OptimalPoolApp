import express from 'express';
import Thread from '../../models/thread.model.js';
import Reply from '../../models/reply.model.js';

const router = express.Router();

// Route to create a new thread in a category
router.post('/categories/:categoryId/threads', async (req, res) => {
    const { title, content } = req.body;
    const { categoryId } = req.params;
  
    try {
      const newThread = new Thread({ title, content, categoryId });
      await newThread.save();
      res.status(201).json(newThread);
    } catch (error) {
      res.status(500).json({ message: 'Error creating thread' });
    }
  });

// Route to get top threads in a category
router.get('/categories/:categoryId/threads/top', async (req, res) => {
    const { categoryId } = req.params;
    const { limit } = req.query;
  
    try {
      const threads = await Thread.find({ categoryId })
        .sort({ createdAt: -1 })
        .limit(parseInt(limit, 10));
      res.json({ threads });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching top threads' });
    }
  });

// Route to get a thread by ID --- changed /api/forum
router.get('/threads/:threadId', async (req, res) => {
    const { threadId } = req.params;
  
    try {
      const thread = await Thread.findById(threadId);
      if (!thread) {
        return res.status(404).json({ message: 'Thread not found' });
      }
      res.json(thread);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching thread' });
    }
  });

// Route to get replies for a thread
router.get('/threads/:threadId/replies', async (req, res) => {
    const { threadId } = req.params;
  
    try {
      const replies = await Reply.find({ threadId });
      res.json({ replies });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching replies' });
    }
  });

// Route to add a reply to a thread
router.post('/threads/:threadId/replies', async (req, res) => {
    const { threadId } = req.params;
    const { content } = req.body;
  
    try {
      const newReply = new Reply({ content, threadId });
      await newReply.save();
      res.status(201).json(newReply);
    } catch (error) {
      res.status(500).json({ message: 'Error adding reply' });
    }
  });

export default router;
