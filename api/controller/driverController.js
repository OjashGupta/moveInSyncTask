const { User, Company, Driver, Feedback } = require("../models");
const { encryptPassword, decryptPassword } = require("../util/util");
const {
  createdSuccessResponse,
  serverErrorResponse,
  successResponse,
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

exports.fetchAllDriver = async (req, res) => {
  try {
    const feedback = await Feedback.findAll();

    const mp = {};

    feedback.map((el) => {
      if (mp[el.DriverId]) {
        mp[el.DriverId].rating += el.answer?.driverRating || 0;
        if (el.answer?.driverRating) {
          mp[el.DriverId].count += 1;
        }
      } else {
        mp[el.DriverId] = {
          rating: el.answer?.driverRating || 0,
          count: el.answer?.driverRating ? 1 : 0,
        };
      }
    });

    const driver = await Driver.findAll();

    const arr = driver.map((el) => {
      const x = JSON.parse(JSON.stringify(el));

      x.rating = mp[el.id]
        ? mp[el.id].count != 0
          ? mp[el.id].rating / mp[el.id].count
          : 0
        : 0;

      x.rating = Math.floor(x.rating);
      return x;
    });

    return successResponse(res, "Succesfully fetched all driver", arr);
  } catch (error) {
    console.log(error);
  }
};
