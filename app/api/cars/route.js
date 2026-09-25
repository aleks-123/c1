import qs from "qs";
import { protect } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import { saveImage } from "@/lib/uploadImages";
import Car from "@/models/Car";

// GET http://localhost:3000/api/cars
// GET http://localhost:3000/api/cars?brand=BMW
// GET http://localhost:3000/api/cars?color=white
// GET http://localhost:3000/api/cars?year=2010
// GET http://localhost:3000/api/cars?year[gte]=2010
// GET http://localhost:3000/api/cars?year[gte]=2010&year[lte]=2020
// GET http://localhost:3000/api/cars?year[gte]=2010&year[lte]=2020&page=2&limit=10

export async function GET(request) {
  try {
    const user = await protect(request);
    if (!user) {
      return Response.json({ message: "Ne ste najaveni" }, { status: 401 });
    }
    console.log(request.nextUrl.searchParams.toString());

    const queryObj = qs.parse(request.nextUrl.searchParams.toString());
    console.log(queryObj);

    const page = Math.max(1, parseInt(queryObj.page, 10) || 1);
    const limit = Math.max(1, parseInt(queryObj.limit, 10) || 30);

    delete queryObj.page;
    delete queryObj.limit;

    console.log(queryObj);

    let queryString = JSON.stringify(queryObj);
    console.log(queryString);
    queryString = queryString.replace(/"(gte|gt|lte|lt)":/g, (match, operator) => `"$${operator}":`);
    console.log(queryString);
    const query = JSON.parse(queryString);

    await connectDB();

    // strana 2 so limit 4: preskikni gi prvite (2 - 1) * 4 = 4 koli

    const skip = (page - 1) * limit;

    const cars = await Car.find(query).sort({ createdAt: -1, _id: -1 }).limit(limit).skip(skip);

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
