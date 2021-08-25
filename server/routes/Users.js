const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/Users");
const {validateToken} = require('../middlewares/Auth');

router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.get("/auth", validateToken, usersCtrl.auth);
router.get("/infos/:id", usersCtrl.getInfos);
router.put("/changepassword", validateToken, usersCtrl.changePassword);
router.delete("/delete/:id", validateToken, usersCtrl.delete);


module.exports = router;