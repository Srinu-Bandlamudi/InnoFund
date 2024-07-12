const express = require("express");
const router = express.Router();

const {validateUserAuth,validateisAdminId}=require('../middlewares/auth-request-validators.js');
const { authenticate,authorizeAdmin } = require('../middlewares/authorization.js');

const { signup,login,verify,passwordResetLink,updatePassword} =require('../controllers/user-controller');
const projectController = require('../controllers/campaignForm.-controller.js');


const contactController = require('../controllers/contact-controller.js');

router.post('/contact', contactController.createContact);
router.get('/contact', contactController.getAllContacts);
router.get('/contact/:id', contactController.getContactById);
router.put('/contact/:id', contactController.updateContact);
router.delete('/contact/:id', contactController.deleteContact);

//User Routes:
router.post('/signup',signup);
router.post('/login',validateUserAuth,login);
router.get('/verify/:token',verify);
router.get('/forgot/password',passwordResetLink);
router.patch('/reset/password/:token',updatePassword);


router.post('/projects', projectController.createProject);
router.get('/projects/:id', projectController.getProjectById);
router.get('/projects', projectController.getAllProjects);
router.put('/projects/:id', projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

router.get('/projects/by/:email', projectController.getProjectsByEmail);

module.exports = router;