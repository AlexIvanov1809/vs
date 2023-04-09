const Router = require("express");
const router = new Router();
const productTypesController = require("../controllers/productTypes.controller");
const checkRole = require("../middleware/CheckRole.middleware");

router.post("/:type", productTypesController.create);
router.patch("/:type/:id", productTypesController.update);
router.delete("/:type/:id", productTypesController.delete);
router.get("/:type", productTypesController.getAll);
// type встречается два раза, непонятно, что это такое. Нужны более понятные имена
router.get("/:type/filter/:typeId", productTypesController.getAllForFilter);

module.exports = router;
