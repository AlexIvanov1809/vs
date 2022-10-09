import fileService from "../service/file.service";

async function imageLoader(images) {
  const data = {};
  for (const key in images) {
    const newImage = await fileService.create(images[key], key);
    data[key] = newImage;
  }
  return data;
}

export default imageLoader;
