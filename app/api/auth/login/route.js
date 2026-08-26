// POST /api/auth/login
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { createToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    //1. Proveruvame dali se isprateni email i password
    if (!email || !password) {
      return NextResponse.json({ message: "Email i pw se zadolzitelni" }, { status: 400 });
    }

    await connectDB();

    //2. Proveruvame dali korinskiot postoi
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    //3. Ja sporeduvame vnesenata lozinka(password)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    //4 Kreirame JWT otkako korisnikot e uspesno proveren
    const token = createToken(user._id.toString());

    const response = NextResponse.json(
      {
        status: "success",
        token,
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      },
      { status: 200 },
    );

    response.cookies.set("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 24 * 60 * 60,
      sameSite: "lax",
    });

    return response;
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
