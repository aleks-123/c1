import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";

function getJWTSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT Secret is not defind");
  }

  return secret;
}

// kreiranje na jwt
export function createToken(userID) {
  return jwt.sign({ id: userID }, getJWTSecret(), { expiresIn: process.env.JWT_EXPIRES_IN || "1d" });
}

// verifikuvanje na token dali e kreiran od nasha strana
export function verifyToken(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, getJWTSecret());
  } catch {
    return null;
  }
}

// Ja povikuvame ovaa funkcija vo sekoja API ruta sto sakame da ja zastutime
export async function protect(request) {
  const authtorisation = request.headers.get("authorization");

  let token;
  if (authtorisation?.startsWith("Bearer ")) {
    token = authtorisation.split(" ")[1];
  }

  if (!token) {
    const cookieStore = await cookies();
    token = cookieStore.get("jwt")?.value;
  }

  const decoded = verifyToken(token);

  if (!decoded) return null;

  await connectDB();

  const user = await User.findById(decoded.id);
  return user;
}

// ja povikuvame ovaa funkcijaa vo Server Componenta da znaeme dali e najaven korisnikot ili ne
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  return verifyToken(token);
}
