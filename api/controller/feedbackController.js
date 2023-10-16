const { User, Company, Driver, Feedback } = require("../models");
const { encryptPassword, decryptPassword } = require("../util/util");
const {
  createdSuccessResponse,
  notFoundResponse,
  accessDeniedResponse,
  successResponse,
  serverErrorResponse,
  badRequestResponse,
} = require("../util/response");

exports.createFeedback = async (req, res) => {
  try {
    const { user_id, trip_id, driver_id, answer } = req.body;

    const tripFeedback = await Feedback.create({
      UserId: user_id,
      TripId: trip_id,
      DriverId: driver_id,
      answer,
    });

    return createdSuccessResponse(res, `Feedback registered`, tripFeedback);
  } catch (error) {
    console.log(error);
    serverErrorResponse(res);
  }
};

exports.fetchAllFeedbackByUsers = async (req, res) => {
  try {
    const { user_id, trip_id, driver_id, answer } = req.body;

    const tripFeedback = await Feedback.findAll({
      where: { UserId: user_id },
    });

    return successResponse(
      res,
      `Successfully fetched feedback of user id ${user_id}`,
      tripFeedback
    );
  } catch (error) {
    console.log(error);
    serverErrorResponse(res);
  }
};
