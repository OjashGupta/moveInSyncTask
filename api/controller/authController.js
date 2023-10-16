const { User, Company } = require("../models");
const { encryptPassword, decryptPassword } = require("../util/util");
const {
  createdSuccessResponse,
  notFoundResponse,
  accessDeniedResponse,
  successResponse,
  serverErrorResponse,
  badRequestResponse,
} = require("../util/response");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, role, email, password } = req.body;

    if (!email || !password) {
      return badRequestResponse(res, "email or password is missing");
    }

    let encodedPassword = await encryptPassword(password);
    const user = await User.create({
      firstName,
      lastName,
      role,
      email,
      password: encodedPassword,
    });

    return createdSuccessResponse(res, `User registered`, user);
  } catch (error) {
    console.log(error);
    serverErrorResponse(res);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return notFoundResponse(res, "Email not found");
    }
    const match = await decryptPassword(password, user.password);
    if (!match) {
      return accessDeniedResponse(res, "Invalid password");
    }

    return successResponse(res, "Successfully logged in", user);
  } catch (error) {
    console.log(error);
    serverErrorResponse(res);
  }
};
