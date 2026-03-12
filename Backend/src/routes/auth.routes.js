const express = require('express');
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @description Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
authRouter.post('/register', authController.registerUserController);

/**
 * @description login user with username/email and passward
 * @route POST /api/auth/login
 * @access Public
 */
authRouter.post('/login', authController.loginUserController);

/**
 * @description clear token from user cookie and token in the blacklist
 * @route GET /api/auth/logout
 * @access Public
 */
authRouter.get('/logout', authController.logoutUserController);

/**
 * @description get me current logged in user details
 * @route GET /api/auth/get-me
 * @access Private
 */
authRouter.get('/get-me', authMiddleware.authUser, authController.getMeController);


module.exports = authRouter;