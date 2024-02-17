import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  threadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread',
    required: true,
  },
  
  
  // Add more fields as needed, such as author, timestamp, etc.
}, { timestamps: true });

const Reply = mongoose.model('Reply', replySchema);

export default Reply;
