const Router = require('express');
const passport = require('passport')
const userService = require('./../services/user.service');

module.exports = {
  create() {
    const api = Router();

    api.post('/register', userService.registerUser); 

    return api;
  },

  login() {
    const api = Router();

    api.post('/login', passport.authenticate('local', { session: false }), userService.loginUser);

    return api;
  }
}