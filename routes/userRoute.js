const express = require('express');
const { registerController, loginController } = require('../controllers/userController');
const routerUser = express.Router();
// const { getAllUsers } = require('../controllers/userController');

// routerUser.get('/admin/users', getAllUsers);
routerUser.post('/register', registerController)
routerUser.post('/login', loginController)
module.exports = routerUser;    