const { DataTypes } = require("sequelize");
const db = require("../middlewares/db-config");

module.exports = db.define("Users", {
  pseudo: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
