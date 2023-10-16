const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const { sequelize } = require("./models");

const authRoutes = require("./routes/authRoutes");
const driverRoutes = require("./routes/driverRoutes");
const tripRoutes = require("./routes/tripRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const userRoutes = require("./routes/userRoutes");

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

const NODE_ENV = process.env.NODE_ENV || "development";

const port = process.env.PORT || 8000;

app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/driver", driverRoutes);
app.use("/api/v1/trip", tripRoutes);
app.use("/api/v1/feedback", feedbackRoutes);
app.use("/api/v1/users", userRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("[CONNECTED TO DATABASE]");
    app.listen(port, () =>
      console.info(`[LISTENING ON PORT:${port} ENV:${NODE_ENV}]`)
    );
  })
  .catch((err) => {
    console.error("Failed to connect to db", err);
  });
