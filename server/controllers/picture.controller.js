const { ProductImg } = require("../models/models");
const ApiError = require("../error/ApiError");
const { convertAndSavePic, removePic } = require("../utils/saveAndRemovePic");
const uuid = require("uuid");

class PictureController {
  async create(req, res, next) {
    const { productId, index } = req.params;

    if (!req.files) {
      return next(ApiError.badRequest("Не отправили фото"));
    }
    // очень некрасивая конструкция. можно заменить на [img].flat()
    // Array.isArray(img) ? img : (img = [img]);
    const img = [req.files.img].flat();

    // forEach не возвращает результат, поэтому невозможно обработать ошибки, возникшие в промисах. Нужно использовать map
    img.forEach(async (i) => {
      let fileName = uuid.v4() + ".jpg";
      convertAndSavePic(i, fileName);

      // зачем тут await?
      await ProductImg.create({
        name: fileName,
        productId,
        row: parseInt(index),
      });
    });
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      if (!req.files) {
        // код после next выполнится после всех последующих middlewares. Нужно писать: return next()
        // https://stackoverflow.com/questions/16810449/when-to-use-next-and-return-next-in-node-js
        next(ApiError.badRequest("Не отправили фото"));
        console.log({ id });
      }
      let { img } = req.files;
      const image = await ProductImg.findOne({ where: { id } });

      let fileName = uuid.v4() + ".jpg";
      // нет обработки промиса
      convertAndSavePic(img, fileName);
      // нет обработки промиса
      removePic(image.name);

      await ProductImg.update(
        {
          name: fileName,
        },
        { where: { id: image.id } },
      );

      return res.json("updated");
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const image = await ProductImg.findOne({ where: { id } });
      // нет обработки промиса
      removePic(image.name);

      await ProductImg.destroy({ where: { id } });
      return res.json("deleted");
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new PictureController();
