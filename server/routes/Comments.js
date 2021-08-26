const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/Comments");
const {validateToken} = require("../middlewares/Auth");

router.post("/", validateToken, commentsCtrl.createComment);
router.get("/:postId", validateToken, commentsCtrl.getAllComments);
router.delete("/:commentId", validateToken, commentsCtrl.deleteComment);

module.exports = router;