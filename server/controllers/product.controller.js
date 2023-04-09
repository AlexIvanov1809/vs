const { Product, ProductImg, ProductPrice } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const { INCLUDES_MODELS } = require("../constants/consts");
const makeEntitiesForFilters = require("../utils/makeEntitiesForFilters");
const { convertAndSavePic, removePic } = require("../utils/saveAndRemovePic");

class ProductController {
  async create(req, res, next) {
    try {
      let { price, ...data } = req.body;
      if (!req.files) {
        return next(ApiError.badRequest("Не отправили фото"));
      }
      let { img } = req.files;

      const product = await Product.create({
        ...data,
      });

      makeEntitiesForFilters(product);

      if (price) {
        price = JSON.parse(price);
        // используй map и обработку промисов через Promise.all
        price.forEach(
          async (i) =>
            await ProductPrice.create({
              weight: i.weight,
              value: i.value,
              productId: product.id,
            }),
        );
      }

      // отрефакторить, чтобы не было тернарника без присваивания
      Array.isArray(img) ? img : (img = [img]);

      // пофиксить необработанные промисы
      img.forEach(async (i, index) => {
        let fileName = uuid.v4() + ".jpg";
        convertAndSavePic(i, fileName);

        await ProductImg.create({
          name: fileName,
          productId: product.id,
          row: index,
        });
      });

      return res.json(product);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { limit, page, ...data } = req.query;
      const filterParams = Object.keys(data).reduce((acc, product) => {
        if (data[product]) {
          acc[product] = data[product].split("-");
        }
        return acc;
      }, {});

      let offset = page * limit - limit;
      let products;

      if (!Object.keys(filterParams).length) {
        products = await Product.findAndCountAll({
          include: INCLUDES_MODELS,
          order: [
            [{ model: ProductPrice, as: "price" }, "value", "ASC"],
            [{ model: ProductImg, as: "image" }, "row", "ASC"],
          ],
        });
      }
      if (Object.keys(filterParams).length) {
        products = await Product.findAndCountAll({
          where: { ...filterParams },
          limit,
          offset,
          include: INCLUDES_MODELS,
          order: [
            [{ model: ProductPrice, as: "price" }, "value", "ASC"],
            [{ model: ProductImg, as: "image" }, "row", "ASC"],
          ],
        });
      }

      return res.json(products);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const products = await Product.findOne({
        where: { id },
        include: INCLUDES_MODELS,
        order: [
          [{ model: ProductPrice, as: "price" }, "value", "ASC"],
          [{ model: ProductImg, as: "image" }, "row", "ASC"],
        ],
      });
      return res.json(products);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async edit(req, res, next) {
    try {
      const { id } = req.params;
      let data = req.body;

      await Product.update(data, { where: { id } });
      const product = await Product.findOne({ where: { id } });

      // необработанный промис
      makeEntitiesForFilters(product);

      if (data.price) {
        const price = JSON.parse(data.price);

        // используй map и обработку промисов через Promise.all
        price.forEach(async (i) =>
          i.productId
            ? await ProductPrice.update(
                {
                  weight: i.weight,
                  value: i.value,
                },
                { where: { id: i.id } },
              )
            : await ProductPrice.create({
                weight: i.weight,
                value: i.value,
                productId: id,
              }),
        );
      }
      return res.json(product);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const img = await ProductImg.findAll({ where: { productId: id } });

      // используй map и обработку промисов через Promise.all
      img.forEach(async (i) => {
        await removePic(i.name);
      });

      // необработанный промис
      makeEntitiesForFilters(id);

      // вместо синхронного удаления используй Promise.all
      await Promise.all([
        ProductImg.destroy({ where: { productId: id } }),
        ProductPrice.destroy({ where: { productId: id } }),
        Product.destroy({ where: { id } }),
      ]);

      return res.json("Product was removed");
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new ProductController();
