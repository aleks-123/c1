import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name e zadolzitelno pole"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email e zadolzitelno pole"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password e zadolzitelno pole"],
      minLength: [4, "Passwordot mora da ima najmalku 8 karakteri"],
      // select: false, ova e dobro za preodukcija
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 16);
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
