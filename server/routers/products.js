const router = require("express").Router();
const Controller = require("../controllers/products");

router.get("/", Controller.getProducts);
router.post("/", Controller.addProduct);
router.put("/:id", Controller.updateProduct);
router.delete("/:id", Controller.deleteProduct);

module.exports = router;
