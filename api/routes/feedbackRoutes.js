const express = require("express");
const {
  createFeedback,
  fetchAllFeedbackByUsers,
  fetchDriverFeedback,
  fetchAllFeedbackByTrips,
  fetchAllFeedback,
  fetchFeedbackById,
} = require("../controller/feedbackController");

const router = express.Router();

router.post("/", createFeedback);
router.get("/", fetchAllFeedback);
router.get("/:id", fetchFeedbackById);
router.post("/users", fetchAllFeedbackByUsers);
router.post("/driver", fetchDriverFeedback);
router.post("/trips", fetchAllFeedbackByTrips);

module.exports = router;
