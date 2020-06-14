import mongoose from 'mongoose';

const DashClientSchema = new mongoose.Schema(
  {
    file: {
      type: Array,
      required: true,
    },
    opacity: {
      type: Number,
      required: false,
    },
    displayLogo: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('DataClient', DashClientSchema);
