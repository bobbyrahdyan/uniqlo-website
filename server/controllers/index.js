const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "Email is required" };
      }

      if (!password) {
        throw { name: "Password is required" };
      }

      const findUser = await User.findOne({ where: { email } });

      if (!findUser) {
        throw { name: "Invalid email or password" };
      }

      if (!comparePass(password, findUser.password)) {
        throw { name: "Invalid email or password" };
      }

      res.status(200).json({
        message: `Success login with email ${findUser.email}`,
        access_token: signToken(findUser.id),
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { body } = req;
      body.role = "admin";

      const register = await User.create(body);

      res.status(200).json({
        message: `Success create email ${register.email}`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
