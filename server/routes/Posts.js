const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/Posts");
const {validateToken} = require('../middlewares/Auth')

router.post("/", validateToken, postsCtrl.createPost);
router.get("/", validateToken, postsCtrl.getAllPosts);
router.get('/byId/:id', validateToken, postsCtrl.getOnePost);
// router.get('/byuserId/:id', postsCtrl.getPostsByUser);
router.delete("/:postId", validateToken, postsCtrl.deletePost);
router.put("/title", validateToken, postsCtrl.editPostTitle);
router.put("/content", validateToken, postsCtrl.editPostContent);

module.exports = router;