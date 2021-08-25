const Users = require("../models/Users");
const Comments = require("../models/Comments");
const Posts = require("../models/Posts");

exports.createComment = (req, res) => {
  const userId = req.user.id;
  const postId = req.body.PostId;
  Comments.create({
    UserId: userId,
    PostId: postId,
    content: req.body.content
  })
  .then(() => res.status(201).json({ message: "Commentaire ajouté !" }))
    .catch((error) => res.status(400).json({ error }));
};


exports.getAllComments = async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId }, include: {model : Users, attributes: ["pseudo"]} });
  res.json(comments);
};

exports.deleteComment = async (req, res) => {
  const commentId = req.params.commentId;
  const comment = await Comments.findByPk(commentId);

  if (!comment || (comment.UserId != req.user.id && req.user.isAdmin != true)) {
    return res
      .status(401)
      .json({ message: "Vous ne pouvez pas supprimer ce commentaire" });
  }
  await Comments.destroy({
    where: {
      id: commentId,
    },
  });
  res.json("Commentaire supprimé !");
};

