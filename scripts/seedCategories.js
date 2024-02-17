import mongoose from 'mongoose';
import Category from '../api/models/category.model.js';
import dotenv from 'dotenv';

dotenv.config();

const categories = [
  { name: 'Pool Maintenance', description: 'Tips and advice on keeping your pool clean, balanced, and well-maintained.' },
  { name: 'Pool Design Ideas', description: 'Share and discuss different pool designs, landscaping, and aesthetic features.' },
  { name: 'Safety and Regulations', description: 'Information on pool safety, child-proofing, and adherence to local regulations.' },
  { name: 'Equipment and Accessories', description: 'Discussions about pool equipment, accessories, and technology.' },
  { name: 'DIY Projects', description: 'Share your DIY pool projects, upgrades, and troubleshooting experiences.' },
];

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    await Category.insertMany(categories);
    console.log('Categories added');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
    mongoose.disconnect();
  });
