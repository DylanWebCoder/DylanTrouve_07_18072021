const { DataTypes } = require("sequelize");
const db = require("../middlewares/db-config");

module.exports = db.define("Likes");
