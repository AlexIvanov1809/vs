const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/coffeeCounties", require("./coffeeItems/country.routes"));
router.use("/coffeeBrands", require("./coffeeItems/brand.routes"));

module.exports = router;
