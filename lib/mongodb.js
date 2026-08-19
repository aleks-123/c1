import mongoose from "mongoose";

export default async function connectDB() {
  // linkot od data baza go vcituvame
  const mongoUrl = process.env.MONGODB_URL;

  // ako neka link vo serverot vrakjame nekakov error
  if (!mongoUrl) {
    throw new Error("MONGODB_URL ne e postaven vo .env.local");
  }

  // ako vekje sme povrzani, nema potreva da pravime konekcija
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // se povrzuvame so bazata i cekame konekcijata da bide uspesna
  return mongoose.connect(mongoUrl);
}
