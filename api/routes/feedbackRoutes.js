const express = require("express");
const {
  createFeedback,
  fetchAllFeedbackByUsers,
} = require("../controller/feedbackController");

const router = express.Router();

router.post("/", createFeedback);
router.post("/users", fetchAllFeedbackByUsers);

module.exports = router;
