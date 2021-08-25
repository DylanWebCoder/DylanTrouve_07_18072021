const Users = require("../models/Users");
const Comments = require("../models/Comments");
const Posts = require("../models/Posts");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

exports.signup = (req, res) => {
  const { pseudo, password } = req.body;
  let newUserIsAdmin = false;
  if (pseudo === "admin") {
    newUserIsAdmin = true;
  }
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      Users.create({
        pseudo: pseudo,
        password: hash,
        is_admin: newUserIsAdmin,
      })
        .then(() => res.status(201).json({ message: "Utilisateur crée !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = async (req, res) => {
  const { pseudo, password } = req.body;
  const user = await Users.findOne({ where: { pseudo: pseudo } });
  if (!user) res.json({ error: "L'utilisateur n'existe pas !" });
  bcrypt.compare(password, user.password).then((match) => {
    if (!match)
      res.json({ error: "Mauvaise combination pseudo et mot de passe" });

    const accessToken = sign(
      { pseudo: user.pseudo, id: user.id, isAdmin: user.is_admin },
      process.env.SECRET_TOKEN
    );
    res.json({ token: accessToken, pseudo: pseudo, id: user.id });
  });
};

exports.auth = (req, res) => {
  res.json(req.user);
};

exports.getInfos = async (req, res) => {
  const id = req.params.id;
  const infos = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(infos);
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { pseudo: req.user.pseudo } });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Les mots de passe ne correspondent pas" });
    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update({ password: hash }, { where: { pseudo: req.user.pseudo } });
      res.json("Mot de passe modifié !");
    });
  });
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  if (id == userId) {
    await Users.destroy({ where: { id: userId } })
      .then(() => res.status(200).json({ message: "Utilisateur supprrimé" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    console.log("NO");
    console.log(id);
    console.log(userId);
  }
};
