const express = require('express');
const { registerController, loginController, getAllUsers, deleteUser, countUsers } = require('../controllers/userController');
const routerUser = express.Router();
// const { getAllUsers } = require('../controllers/userController');

// routerUser.get('/admin/users', getAllUsers);
routerUser.post('/register', registerController)
routerUser.post('/login', loginController)
routerUser.get('/users', getAllUsers)
routerUser.delete('/users/:id', deleteUser);
routerUser.get('/users/count', countUsers);
module.exports = routerUser;    