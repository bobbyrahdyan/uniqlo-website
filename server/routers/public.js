const router = require("express").Router();
const Controller = require("../controllers/public");

router.get("/", Controller.readAllProduct);
router.get("/:slug", Controller.getProductsDetail);

module.exports = router;
