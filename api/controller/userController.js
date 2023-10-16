const { ROLES } = require("../constants");
const { User } = require("../models");
const { successResponse } = require("../util/response");

exports.fetchAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: ROLES.TRAVELLER },
    });

    return successResponse(res, "Successfully fetched users", users);
  } catch (error) {
    console.log(error);
  }
};
