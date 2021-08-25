const { DataTypes } = require("sequelize");
const db = require("../middlewares/db-config");

module.exports = db.define("Comments", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
