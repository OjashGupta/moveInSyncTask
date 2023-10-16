const { Trip, User, Driver, Feedback } = require("../models");
const {
  createdSuccessResponse,
  successResponse,
  notFoundResponse,
} = require("../util/response");

exports.createTrip = async (req, res) => {
  try {
    const { user_id, name, desc, driver_id } = req.body;

    const trip = await Trip.create({
      UserId: user_id,
      name,
      desc,
      DriverId: driver_id,
    });

    return createdSuccessResponse(res, "Created a trip", trip);
  } catch (error) {}
};

exports.getAllTrip = async (req, res) => {
  try {
    const { user_id } = req.body;
    console.log(user_id);

    const trips = await Trip.findAll({
      where: { UserId: +user_id },
      include: [User, Driver],
    });

    return successResponse(res, "succesfully fetched all trip ", trips);
  } catch (error) {
    console.log(error);
  }
};

exports.getTripById = async (req, res) => {
  try {
    const { id: tripId } = req.params;

    const trip = await Trip.findOne({
      where: { id: tripId },
      include: [Driver],
    });

    if (!trip) {
      return notFoundResponse(res, `Trip not found with id ${tripId}`);
    }

    const feedback = await Feedback.findOne({ where: { TripId: tripId } });
    if (feedback?.answer) {
      return successResponse(res, "succesfully fetched trip ", {
        ...JSON.parse(JSON.stringify(trip)),
        feedback,
      });
    } else {
      return successResponse(res, "succesfully fetched trip ", trip);
    }
  } catch (error) {
    console.log(error);
  }
};
