// POST /api/auth/login
import bcrypt from "bcryptjs";
import User from "@/models/User";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    //1. Proveruvame dali se isprateni email i password
    if (!email || !password) {
      return Response.json({ message: "Email i pw se zadolzitelni" }, { status: 400 });
    }

    await connectDB();

    //2. Proveruvame dali korinskiot postoi
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return Response.json({ message: "Invalid email or password" }, { status: 401 });
    }

    //3. Ja sporeduvame vnesenata lozinka(password)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return Response.json({ message: "Invalid email or password" }, { status: 401 });
    }
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
