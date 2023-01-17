const { Product, Image, User, Category } = require("../models");

class Controller {
  static async readAllProduct(req, res, next) {
    try {
      const readAllProduct = await Product.findAll({
        include: [
          Image,
          {
            model: User,
            attributes: ["username"],
          },
          Category,
        ],
        order: [["name", "ASC"]],
      });

      res.status(200).json(readAllProduct);
    } catch (error) {
      next(error);
    }
  }

  static async getProductsDetail(req, res, next) {
    try {
      const { slug } = req.params;
      const getProductsDetail = await Product.findOne({
        where: { slug },
        include: [Image, { model: User, attributes: ["username"] }, Category],
      });

      if (!getProductsDetail) {
        throw { name: "Not found" };
      }

      res.status(200).json(getProductsDetail);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
