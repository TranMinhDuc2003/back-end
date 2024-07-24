import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Type is required"],
      min: 6,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    description: {
      type: String,
      min: 6,
    },
    images: {
      type: String,
      require: [true, "images is required"]
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);
