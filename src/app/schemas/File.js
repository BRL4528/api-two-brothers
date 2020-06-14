import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('File', FileSchema);
