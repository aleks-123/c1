import connectDB from "@/lib/mongodb";
import Car from "@/models/Car";
import { protect } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const user = await protect(request);
    if (!user) {
      return Response.json({ message: "Ne ste najaveni" }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;
    const car = await Car.findById(id);

    if (!car) {
      return Response.json({ message: "Kolata ne e pronajdena" }, { status: 404 });
    }

    return Response.json(car, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
export async function PUT(request, { params }) {
  try {
    const user = await protect(request);
    if (!user) {
      return Response.json({ message: "Ne ste najaveni" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updatedCar = await Car.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCar) {
      return Response.json({ message: "Kolata ne e pronajdena" }, { status: 404 });
    }

    return Response.json(updatedCar, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      return Response.json({ message: "Kolata ne e pronajdena" }, { status: 404 });
    }
    return Response.json({ message: "Kolata e uspesno izbrisana" }, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
