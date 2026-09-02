import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import sendEmail from "@/lib/sendEmail";

// POST /api/auth/register
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return Response.json({ message: "Site polinja se zadolzitelni" }, { status: 400 });
    }

    await connectDB();

    const newUser = await User.create({ name, email, password });

    await sendEmail({
      email: newUser.email,
      subject: "Uspesna registracija na nashiot portal",
      message: `Zdravo ${newUser.name}, uspesno se registriravte vo nashata platforma, iskoristete 20 posto vaucer za dobredojde`,
      htmlMessage: `
        <h2>Zdravo ${newUser.name}</h2>
        <p>uspesno se registriravte vo nashata platforma, iskoristete 20 posto vaucer za dobredojde</p>
      `,
    });

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
