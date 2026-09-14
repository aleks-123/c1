import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const allowedTypes = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function saveImage(file) {
  // console.log(file);

  if (!file || file.size === 0) return "";

  console.log(file);

  if (!allowedTypes[file.type]) {
    const error = new Error("Dozvoleni se samo JPG, PNG, Webp sliki.");
    error.status = 400;
    throw error;
  }

  // public/uploads
  const uploadFolder = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadFolder, { recursive: true });

  const fileName = Date.now() + "-" + randomUUID() + "." + allowedTypes[file.type];
  //  gi citame binarnite podatoci od slikata.
  const bytes = await file.arrayBuffer();

  // ja zapisuvame slikata vo public/uploads
  await writeFile(path.join(uploadFolder, fileName), Buffer.from(bytes));

  // za vo dokumentot vo kolekcijata koli
  return fileName;
}
