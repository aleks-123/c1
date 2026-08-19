import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "Brand e zadolzitelno pole"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "Model na kolata e zadolzitelno pole"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Godina na kolata e zadolzitelno pole"],
    },
    color: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

const Car = mongoose.models.Car || mongoose.model("Car", carSchema);

export default Car;
