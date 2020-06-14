import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    cel: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Contact', ContactSchema);
