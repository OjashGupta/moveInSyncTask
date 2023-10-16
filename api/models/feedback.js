module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define("Feedback", {
    answer: { type: DataTypes.JSON },
  });

  return Feedback;
};
