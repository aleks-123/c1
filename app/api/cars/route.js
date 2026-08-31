import { protect } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Car from "@/models/Car";

// GET http://localhost:3000/api/cars
export async function GET(request) {
  try {
    const user = await protect(request);
    if (!user) {
      return Response.json({ message: "Ne ste najaveni" }, { status: 401 });
    }

    await connectDB();

    const cars = await Car.find();

    return Response.json(cars, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

// POST http://localhost:3000/api/cars
export async function POST(request) {
  try {
    const user = await protect(request);
    if (!user) {
      return Response.json({ message: "Ne ste najaveni" }, { status: 401 });
    }
    console.log(request.method);
    console.log(request.url);
    console.log(request.headers);
    await connectDB();

    const body = await request.json();
    const newCar = await Car.create(body);

    return Response.json(newCar, { status: 201 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
