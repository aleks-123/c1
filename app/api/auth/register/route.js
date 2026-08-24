import User from "@/models/User";
import connectDB from "@/lib/mongodb";

// POST /api/auth/register
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return Response.json({ message: "Site polinja se zadolzitelni" }, { status: 400 });
    }

    await connectDB();

    const newUser = await User.create({ name, email, password });

    return Response.json(
      {
        status: "Success",
        data: {
          user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          },
        },
      },
      { status: 201 },
    );
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
