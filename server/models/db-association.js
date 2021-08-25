const Posts = require("./Posts");
const Comments = require("./Comments");
const Likes = require("./Likes");
const Users = require("./Users");

Posts.hasMany(Comments, {
  foreignKey: { allowNull: false },
});
Comments.belongsTo(Posts);

Posts.hasMany(Likes, {
  foreignKey: { allowNull: false },
});
Likes.belongsTo(Posts);

Users.hasMany(Likes, {
  foreignKey: { allowNull: false },
});
Likes.belongsTo(Users);

Users.hasMany(Posts, {
  foreignKey: { allowNull: false },
});
Posts.belongsTo(Users);

Users.hasMany(Comments, {
  foreignKey: {allowNull: false}
});
Comments.belongsTo(Users);