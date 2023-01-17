const { User, Product, Image, Category, sequelize } = require("../models");

class Controller {
    static async getProducts(req, res, next) {
      try {
        const getProducts = await Product.findAll({
          include: [
            Category,
            {
              model: User,
              attributes: ["username"],
            },
            Image,
          ],
          order: [["updatedAt", "DESC"]],
        });

        res.status(200).json(getProducts);
      } catch (error) {
        next(error);
      }
    }

    static async addProduct(req, res, next) {
      try {
        const { id } = req.user;
        const { product, images } = req.body;
        product.authorId = id;

        await sequelize.transaction(async (t) => {
          const addProduct = await Product.create(product, { transaction: t });

          const bulkImg = images.map((el) => ({
            ...el,
            productId: addProduct.id,
          }));

          await Image.bulkCreate(bulkImg, { transaction: t });

          const findProducts = await Product.findByPk(addProduct.id, {
            include: [
              Category,
              {
                model: User,
                attributes: ["username"],
              },
              Image,
            ],
            transaction: t,
          });

          res.status(201).json({
            message: `Success create new product ${addProduct.name}`,
            data: findProducts,
          });
        });
      } catch (error) {
        next(error);
      }
    }

    static async updateProduct(req, res, next) {
      try {
        const { id } = req.params;
        const { product, images } = req.body;

        await sequelize.transaction(async (t) => {
          const findProducts = await Product.findByPk(id, { transaction: t });

          if (!findProducts) {
            throw { name: "Not found" };
          }

          await Product.update(product, { where: { id }, transaction: t });

          const bulkImg = images.map((el) => ({
            ...el,
            productId: id,
          }));

          const bulkUpdate = await Image.bulkCreate(bulkImg, {
            updateOnDuplicate: ["id", "imgUrl"],
            transaction: t,
          });

          const findNewProducts = await Product.findByPk(id, {
            include: [
              Category,
              {
                model: User,
                attributes: ["username"],
              },
              Image,
            ],
            transaction: t,
          });

          res.status(200).json({
            message: `Success update product`,
            data: findNewProducts,
          });
        });
      } catch (error) {
        next(error);
      }
    }

    static async deleteProduct(req, res, next) {
      try {
        const { id } = req.params;

        await sequelize.transaction(async (t) => {
          const findProduct = await Product.findByPk(id, { transaction: t });

          if (!findProduct) {
            throw { name: "Not found" };
          }

          await Image.destroy({ where: { productId: id }, transaction: t });
          await Product.destroy({ where: { id }, transaction: t });

          res.status(200).json({ message: `Success delete product ${findProduct.name}` });
        });
      } catch (error) {
        next(error);
      }
    }
  }

  module.exports = Controller;
