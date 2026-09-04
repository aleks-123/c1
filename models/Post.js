import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title e zadolzitelno pole"],
      trim: true,
      maxLength: [120, "Title moze da ima najmnogu 120 karakteri"],
    },
    content: {
      type: String,
      required: [true, "Content e zadolzitelno pole"],
      trim: true,
      maxLength: [300, "Content moze da ima najmnogu 300 karaketri"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      reqired: [true, "Author e zadolzitelno pole"],
    },
  },
  { timestamps: true },
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
