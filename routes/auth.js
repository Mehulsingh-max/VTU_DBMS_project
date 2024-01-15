const express = require("express")
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/register',authController.register);
router.post('/login',authController.login);
router.get('/logout',authController.logout);
router.post('/register_admin',authController.register_admin); 
router.post('/login_admin',authController.login_admin);
// router.get('/logout_admin',authController.logout_admin);
module.exports = router;