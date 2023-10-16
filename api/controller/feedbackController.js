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

exports.fetchDriverFeedback = async (req, res) => {
  try {
    const { driver_id } = req.body;
    const driverFeedback = await Feedback.findAll({
      where: { driver_id },
    });

    let driverRating = 0;
    driverFeedback.map((el) => {
      driverRating += el.answer.driver;
    });

    let avgRating = driverRating / driverFeedback.length;
    return successResponse(
      res,
      "Successfully fetched feedback of driver ${driver_id}",
      avgRating
    );
  } catch (error) {
    console.log(error);
  }
};

exports.fetchAllFeedbackByUsers = async (req, res) => {
  try {
    const { user_id, trip_id, driver_id, answer } = req.body;

    const tripFeedback = await Feedback.findAll({
      where: { TripId: trip_id },
    });

    let tripRating = 0;
    tripFeedback.map((el) => {
      tripRating += el.answer.trip.rating;
    });
    tripFeedback;
    return successResponse(
      res,
      `Successfully fetched feedback of trip id ${trip_id}`,
      tripFeedback
    );
  } catch (error) {
    console.log(error);
    serverErrorResponse(res);
  }
};
