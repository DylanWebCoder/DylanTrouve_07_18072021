const Users = require("../models/Users");
const Comments = require("../models/Comments");
const Posts = require("../models/Posts");
const Likes = require("../models/Likes");

exports.addLike = async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;

  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });

  if (!found) {
    await Likes.create({ PostId: PostId, UserId: UserId });
    res.json({ liked: true });
  } else {
    await Likes.destroy({ where: { PostId: PostId, UserId: UserId } });
    res.json({ liked: false });
  }
};
