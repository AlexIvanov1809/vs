import httpService from "../http/productAPI";
import makeFormDataFile from "./makeFormDataFile";

export default function imgUploader(img, product) {
  // почему массив предзаполнен тремя пустыми значениями?
  const imgIds = ["", "", ""];
  product.image.forEach((img) => {
    imgIds[img.row] = img.id;
  });

  // если img это массив, то необходмио писать во множественном числе
  img.forEach((file, index) => {
    if (imgIds[index] && typeof file === "object") {
      const formData = makeFormDataFile(null, [file]);

      // обработку ошибок промисов нужно отдавать наверх
      httpService
        // а кто устанавливает заголовок о том, что передается multipart/form-data?
        .editProductImage(imgIds[index], formData)
        .then((data) => console.log(data))
        .catch((e) => console.log(e));
    }

    if (!imgIds[index] && typeof file === "object") {
      const formData = makeFormDataFile(null, [file]);

      // обработку ошибок промисов нужно отдавать наверх
      httpService
        .createProductImage(product.id, index, formData)
        .then((data) => console.log(data))
        .catch((e) => console.log(e.message));
    }

    if (imgIds[index] && !file) {
      // обработку ошибок промисов нужно отдавать наверх
      httpService
        .removeProductImage(imgIds[index])
        .then((data) => console.log(data))
        .catch((e) => console.log(e.message));
    }
  });
}
