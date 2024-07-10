const express = require("express");
const router = express.Router();

const {validateUserAuth,validateisAdminId}=require('../middlewares/auth-request-validators.js');
const { authenticate,authorizeAdmin } = require('../middlewares/authorization.js');

const { signup,login,verify,passwordResetLink,updatePassword} =require('../controllers/user-controller');

//User Routes:
router.post('/signup',signup);
router.post('/login',validateUserAuth,login);
router.get('/verify/:token',verify);
router.get('/forgot/password',passwordResetLink);
router.patch('/reset/password/:token',updatePassword);

module.exports = router;