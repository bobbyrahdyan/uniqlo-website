const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "Login required" };
    }

    const id = verifyToken(access_token);

    const findUser = await User.findByPk(id);

    if (!findUser) {
      throw { name: "Invalid token" };
    }

    req.user = { id: findUser.id };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
