const express = require("express");
const helmet = require("helmet");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const db = require("./middlewares/db-config");
const dbAssoc = require("./models/db-association");

// Import Routes
const usersRoutes = require("./routes/Users");
const postsRoutes = require ("./routes/Posts");
const commentsRoutes = require("./routes/Comments");
const likesRoutes = require("./routes/Likes");

// Launch Express
const app = express();

// Connect to DataBase
db.authenticate()
  .then(() => {
    console.log("Connexion à la BDD réussie");
    db.sync({ alter: true });
  })
  .catch((error) => {
    console.log("Connexion à la BDD échouée");
    console.log(error);
  });

// CORS
app.use(cors());

// Bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Helmet
app.use(helmet());

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/likes', likesRoutes);

module.exports = app;
