module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define("Trip", {
    name: { type: DataTypes.STRING },
    desc: { type: DataTypes.STRING },
  });

  return Trip;
};
