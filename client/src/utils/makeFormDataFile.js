// что такое item?
// что такое img, если в названии функции нет ни слова об изображениях?
export default function makeFormDataFile(item, img) {
  const formData = new FormData();
  if (img) {
    img.forEach((i) => {
      // это очень странная проверка. Если хочется выразить пустоту, то используют null или undefined. Но вообще я бы
      // даже и такую проверку не делал, оставляя ее на совесть вызывающего кода
      if (i !== "") {
        formData.append("img", i);
      }
    });
  }

  if (item) {
    for (const key in item) {
      if (item[key] !== "") {
        formData.append(key, item[key]);
      }
    }
  }
  return formData;
}
