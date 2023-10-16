const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("mis", "root", "root", {
  host: "localhost",
  dialect:
    "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  logging: false,
});
try {
  sequelize.authenticate();
  // console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, DataTypes);
db.Driver = require("./driver")(sequelize, DataTypes);
db.Trip = require("./trip")(sequelize, DataTypes);
db.Feedback = require("./feedback")(sequelize, DataTypes);
// db.FeedbackAns = require("./feedbackAns")(sequelize, DataTypes);

db.User.hasMany(db.Trip);
db.Trip.belongsTo(db.User);

db.Driver.hasMany(db.Trip);
db.Trip.belongsTo(db.Driver);

db.Trip.hasMany(db.Feedback);
db.Feedback.belongsTo(db.Trip);

db.User.hasMany(db.Feedback);
db.Feedback.belongsTo(db.User);

db.Driver.hasMany(db.Feedback);
db.Feedback.belongsTo(db.Driver);

module.exports = db;
