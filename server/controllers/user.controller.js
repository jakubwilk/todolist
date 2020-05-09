const Router = require('express');
const { body } = require('express-validator');
const userService = require('./../services/user.service');

module.exports = {
  create() {
    const api = Router();

    api.post('/register', [body('email').trim(), body('password').trim().escape()], userService.registerUser); 

    return api;
  },

  login() {
    const api = Router();

    api.post('/login', [body('email').trim(), body('password').trim().escape()], userService.loginUser);

    return api;
  }
}