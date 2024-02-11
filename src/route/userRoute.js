const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


router.post('/createUser', userController.createUser);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getAllAdmin', userController.getAllAdmin);
module.exports = router