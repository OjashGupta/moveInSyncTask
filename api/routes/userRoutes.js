const express = require("express");
const { createDriver } = require("../controller/driverController");
const { fetchAllUsers } = require("../controller/userController");

const router = express.Router();

router.get("/", fetchAllUsers);

module.exports = router;
