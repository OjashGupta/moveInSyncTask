const { User, Company, Driver } = require("../models");
const { encryptPassword, decryptPassword } = require("../util/util");
const {
  createdSuccessResponse,
  notFoundResponse,
  accessDeniedResponse,
  successResponse,
  serverErrorResponse,
  badRequestResponse,
} = require("../util/response");

exports.createDriver = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const driver = await Driver.create({
      firstName,
      lastName,
      email,
    });

    return createdSuccessResponse(res, `Driver registered`, driver);
  } catch (error) {
    console.log(error);
    serverErrorResponse(res);
  }
};
