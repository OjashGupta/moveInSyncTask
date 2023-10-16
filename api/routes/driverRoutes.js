const express = require("express");
const {
  createDriver,
  fetchAllDriver,
} = require("../controller/driverController");

const router = express.Router();

router.post("/", createDriver);
router.get("/", fetchAllDriver);

module.exports = router;
