import { protect } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import { saveImage } from "@/lib/uploadImages";
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

    if (!request.headers.get("content-type")?.startsWith("multipart/form-data")) {
      return Response.json({ message: "Koristi body > form-data." }, { status: 400 });
    }

    await connectDB();

    // const body = await request.json();
    const formData = await request.formData();
    console.log(formData);

    const car = new Car({
      brand: formData.get("brand"),
      model: formData.get("model"),
      year: formData.get("year"),
      color: formData.get("color"),
    });

    await car.validate();

    /////
    car.image = await saveImage(formData.get("image"));

    const imageFiles = formData.getAll("images");

    car.images = [];

    for (const file of imageFiles) {
      const filename = await saveImage(file);
      if (filename) car.images.push(filename);
    }
    /////

    await car.save();

    return Response.json(car, { status: 201 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
// const newCar = await Car.create(body);
//  console.log(request.method);
//   console.log(request.url);
//   console.log(request.headers);
