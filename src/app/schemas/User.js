import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// UserSchema.pre('save', async (next) => {
//   const hash = await bcrypt.hash(this.password, 10);
//   this.password = hash;

//   next();
// });

export default mongoose.model('User', UserSchema);
