// scripts/seedThreads.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Thread from '../api/models/thread.model.js';

dotenv.config();

const threads = [
    // Category 1: Pool Maintenance
    {
      title: 'Best Pool Cleaning Tips',
      content: 'Share your best pool cleaning tips here!',
      categoryId: new mongoose.Types.ObjectId('65cedd85910c56e3276a1309'), // Replace with actual category ID
      repliesCount: 5,
    },
    {
      title: 'How often should I check my pool\'s pH levels?',
      content: 'I\'m new to pool maintenance and would appreciate any advice on pH testing.',
      categoryId: new mongoose.Types.ObjectId('65cedd85910c56e3276a1309'),
      repliesCount: 3,
    },
    {
      title: 'Automatic pool cleaners - worth the investment?',
      content: 'Looking for feedback on whether automatic pool cleaners are worth the cost.',
      categoryId: new mongoose.Types.ObjectId('65cedd85910c56e3276a1309'),
      repliesCount: 7,
    },
    {
      title: 'Dealing with algae in your pool',
      content: 'What are your best tips for preventing and dealing with algae in your pool?',
      categoryId: new mongoose.Types.ObjectId('65cedd85910c56e3276a1309'),
      repliesCount: 4,
    },
    {
      title: 'Winterizing your pool - best practices',
      content: 'How do you prepare your pool for the winter months to prevent damage?',
      categoryId: new mongoose.Types.ObjectId('65cedd85910c56e3276a1309'),
      repliesCount: 2,
    },
    // Add more threads for each category...
  
    // Category 2: Pool Design Ideas
    {
      title: 'Modern pool design trends',
      content: 'What are some modern design trends you\'ve seen for pools that you love?',
      categoryId: new mongoose.Types.ObjectId('65cedd85910c56e3276a130a'),
      repliesCount: 6,
    },
    {
      title: 'Incorporating water features into pool design',
      content: 'Looking for ideas on how to incorporate water features into my pool design.',
      categoryId: new mongoose.Types.ObjectId('65cedd85910c56e3276a130a'),
      repliesCount: 5,
    },
    {
      title: 'Choosing the right pool tiles',
      content: 'Any recommendations on choosing tiles that are both durable and stylish?',
      categoryId: new mongoose.Types.ObjectId('65cedd85910c56e3276a130a'),
      repliesCount: 3,
    },
    {
      title: 'LED lighting for pools',
      content: 'Has anyone used LED lighting in their pool? Looking for tips and ideas.',
      categoryId: new mongoose.Types.ObjectId('65cedd85910c56e3276a130a'),
      repliesCount: 4,
    },
    {
      title: 'Creating a natural pool look',
      content: 'Interested in creating a more natural, lagoon-style pool. Any suggestions?',
      categoryId: new mongoose.Types.ObjectId('65cedd85910c56e3276a130a'),
      repliesCount: 2,
    },
    // Add more threads for each category...
  ];
  

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    await Thread.insertMany(threads);
    console.log('Threads added');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
    mongoose.disconnect();
  });
