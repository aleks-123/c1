import connectDB from "@/lib/mongodb";
import sendEmail from "@/lib/sendEmail";
import User from "@/models/User";
import crypto from "crypto";

// POST /api/auth/forgotpassword
export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return Response.json({ message: "Email e zadolzitelno pole" }, { status: 400 });
    }

    await connectDB();

    //1. Go barame korisnikot spored emailot ispraten od body

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return Response.json({ message: "Ako postoi ovaj korinsik, kje dobiete mail" }, { status: 200 });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.passwordResetExpires = Date.now() + 30 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const origin = new URL(request.url).origin;
    const resetUrl = `${origin}/api/auth/resetpassword/${resetToken}`;

    const message = `Ja zabovavivte vashata lozinka? Isprate Patch request so novata lozina na ovoj URL: ${resetUrl}`;

    await sendEmail({
      email: user.email,
      subject: "Vashiot resetiracki token (30 minuti validen)",
      message,
    });

    return Response.json({ status: "success", message: "Ako postoi ovaj korinsik, kje dobiete mail" }, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
