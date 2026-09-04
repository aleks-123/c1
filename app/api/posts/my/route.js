import { protect } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(request) {
  try {
    await connectDB();

    const user = await protect(request);

    if (!user) {
      return Response.json({ message: "Ne ste najaveni" }, { status: 401 });
    }

    const myPost = await Post.find({ author: user._id }).populate("author");

    return Response.json(myPost, { status: 200 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
