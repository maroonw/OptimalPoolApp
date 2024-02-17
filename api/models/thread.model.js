// api/models/thread.model.js
import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  repliesCount: {
    type: Number,
    default: 0,
  },
  // Add more fields as needed
}, { timestamps: true });

const Thread = mongoose.model('Thread', threadSchema);

export default Thread;
