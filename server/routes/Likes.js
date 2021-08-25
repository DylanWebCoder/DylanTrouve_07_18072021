const express = require("express");
const router = express.Router();
const likesCtrl = require("../controllers/Likes");
const {validateToken} = require("../middlewares/Auth");

router.post("/",  validateToken ,likesCtrl.addLike);

module.exports = router;