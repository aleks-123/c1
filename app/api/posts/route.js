import { protect } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET() {
  try {
    await connectDB();

    const posts = await Post.find().populate("author");

    return Response.json(posts, { status: 200 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const user = await protect(request);

    if (!user) {
      return Response.json({ message: "Ne ste najaveni" }, { status: 401 });
    }

    const { title, content } = await request.json();

    const newPost = await Post.create({
      title,
      content,
      author: user._id,
    });

    return Response.json(newPost, { status: 201 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
