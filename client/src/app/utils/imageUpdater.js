import fileService from "../service/file.service";

async function imageUpdater(image, data) {
  const update = { ...image };
  for (const key in image) {
    if (!image[key]._id) {
      if (image[key]) {
        if (data.images[key]) {
          const updatedImage = await fileService.edit(
            image[key],
            data.images[key]
          );
          update[key] = updatedImage;
        } else {
          const newImage = await fileService.create(image[key], key);
          update[key] = newImage;
        }
      } else {
        const { message } = await fileService.remove(data.images[key]);
        delete update[key];
        console.log(message);
      }
    }
  }
  return update;
}
export default imageUpdater;
