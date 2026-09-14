// PATCH /api/auth/resetpassword/:token
//  {
//   "password" : '123qwerty'
//  }
import User from "@/models/User";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";

export async function PATCH(request, { params }) {
  try {
    const { token } = await params;
    const { password } = await request.json();

    if (!password) {
      return Response.json({ message: "Novata lozinka e zadolzitelna" }, { status: 400 });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    await connectDB();

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    }).select("+passwordResetToken, +passwordResetExpires");

    if (!user) {
      return Response.json({ message: "Tokenot e nevaliden ili isticen" }, { status: 400 });
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return Response.json({ status: "success", message: "Uspesno ja promenivte vashata lozinka" }, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
