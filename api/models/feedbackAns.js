module.exports = (sequelize, DataTypes) => {
  const FeedbackAns = sequelize.define("FeedbackAns", {
    answer: { type: DataTypes.string },
  });

  return FeedbackAns;
};
