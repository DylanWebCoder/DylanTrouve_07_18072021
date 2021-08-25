const Users = require("../models/Users");
const Comments = require("../models/Comments");
const Posts = require("../models/Posts");
const Likes = require("../models/Likes");

exports.createPost = (req, res) => {
  const userId = req.user.id;
  Posts.create({
    UserId: userId,
    title: req.body.title,
    content: req.body.content,
  })
    .then(() => res.status(201).json({ message: "Le post a été créer" }))
    .catch((error) => res.status(400).json({ error }));
  console.log(userId);
};

exports.getAllPosts = async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [{model: Likes}, {model: Users, attributes: ["pseudo"]}] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
};

exports.getOnePost = async (req, res) => {
  const id = req.params.id;
  /*const post = await Posts.findByPk(id);
  res.json(post);*/
  Posts.findOne({ where: { id: id }, include: {model: Users, attributes: ["pseudo"]} })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

exports.getPostsByUser = async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(listOfPosts);
};

exports.deletePost = async (req, res) => {
  const postId = req.params.postId;
  const post = await Posts.findByPk(postId);
  if (!post || (post.UserId != req.user.id && req.user.isAdmin != true)) {
    return res
      .status(401)
      .json({ message: "Vous ne pouvez pas supprimer ce post" });
  }
  await Posts.destroy({
    where: { id: postId },
  });
  res.json("Post supprimé");
};

exports.editPostTitle = async (req, res) => {
  const { newTitle, id } = req.body;
  await Posts.update({ title: newTitle }, { where: { id: id } });
  res.json(newTitle);
};

exports.editPostContent = async (req, res) => {
  const { newContent, id } = req.body;
  await Posts.update({ content: newContent }, { where: { id: id } });
  res.json(newContent);
};
