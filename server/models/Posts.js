const { DataTypes } = require("sequelize");
const db = require("../middlewares/db-config");

module.exports = db.define("Posts", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
