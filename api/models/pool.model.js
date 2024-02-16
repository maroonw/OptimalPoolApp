import mongoose from 'mongoose';

const poolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['Inground', 'Above Ground'], // Example values
    },
    saltwater: {
      type: Boolean,
      required: true,
    },
    shape: {
      type: String,
      required: true,
    },
    // Add more pool-specific fields as needed
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Pool = mongoose.model('Pool', poolSchema);

export default Pool;
