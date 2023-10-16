const express = require("express");
const { createDriver } = require("../controller/driverController");

const router = express.Router();

router.post("/", createDriver);

module.exports = router;
