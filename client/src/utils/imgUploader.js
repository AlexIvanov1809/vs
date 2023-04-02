import httpService from "../http/productAPI";
import makeFormDataFile from "./makeFormDataFile";

export default function imgUploader(img, item) {
  img.forEach((i, index) => {
    if (item.image[index] && i && item.image[index].name !== i) {
      const formData = makeFormDataFile(null, [i]);
      httpService
        .editItemImage(item.image[index].id, formData)
        .then((data) => console.log(data))
        .catch((e) => console.log(e.message));
    }
    if (!item.image[index] && i) {
      const formData = makeFormDataFile(null, [i]);
      httpService
        .createItemImage(item.id, formData)
        .then((data) => console.log(data))
        .catch((e) => console.log(e.message));
    }
    if (item.image[index] && !i) {
      httpService
        .removeItemImage(item.image[index].id)
        .then((data) => console.log(data))
        .catch((e) => console.log(e.message));
    }
  });
}
