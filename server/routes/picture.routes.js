const Router = require("express");
const router = new Router();
const pictureController = require("../controllers/picture.controller");
const checkRole = require("../middleware/CheckRole.middleware");

// если картинка принадлежит продукту, то по rest урл должен быть /product/:productId/picture. Индекс я бы вынес в тело запроса
router.post("/:productId/:index", pictureController.create);
router.patch("/:id", pictureController.update);
router.delete("/:id", pictureController.delete);

module.exports = router;
