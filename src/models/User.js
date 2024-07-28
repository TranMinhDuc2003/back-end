import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      min: 6,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: 6,
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
    isActive: {
			type: Boolean,
			default: false,
		},
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
