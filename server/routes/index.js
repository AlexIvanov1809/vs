const Router = require("express");
const router = new Router();

router.use("/user", require("./user.routes"));
// обычно в роутах не используются заглавные буквы, вместо этого используются дефисы
router.use("/productTypes", require("./productTypes.routes"));
router.use("/product", require("./product.routes"));
router.use("/pictures", require("./picture.routes"));
router.use("/price", require("./price.routes"));
router.use("/order", require("./order.routes"));

module.exports = router;
