const express = require("express");
const {
  createTrip,
  getAllTrip,
  getTripById,
} = require("../controller/tripController");

const router = express.Router();

router.post("/", createTrip);
router.post("/getAll", getAllTrip);
router.get("/:id", getTripById);

module.exports = router;
