import mongoose from "mongoose";

// create UserSchema
const UserSchema = new mongoose.Schema({
  userName: {
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
  joinedDate: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("userSchema", UserSchema);
