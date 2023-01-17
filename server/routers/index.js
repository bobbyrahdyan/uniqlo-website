const router = require("express").Router();
const publicRouter = require("./public");
const productRouter = require("./products");
const categoriesRouter = require("./categories");
const Controller = require("../controllers");
const authentication = require("../middleware/authentication");

router.post("/login", Controller.login);

router.use("/pub", publicRouter);

router.use(authentication);

router.post("/register", Controller.register);
router.use("/products", productRouter);
router.use("/categories", categoriesRouter);

module.exports = router;
