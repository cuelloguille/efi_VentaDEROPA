const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");
const auth = require("../midlewares/auth");

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/profile", auth, userCtrl.profile);
router.post("/forgot-password", userCtrl.forgotPassword);
router.post("/reset-password", userCtrl.resetPassword);

module.exports = router;
