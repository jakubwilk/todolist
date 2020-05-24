const Router = require('express');
const { userValidationRules, registerUser, loginUser, checkToken, getUserData } = require('./../services/user.service');

module.exports = {
  create() {
    const api = Router();

    api.post('/register', userValidationRules(), registerUser); 

    return api;
  },

  login() {
    const api = Router();

    api.post('/login', userValidationRules(), loginUser);

    return api;
  },

  verify() {
    const api = Router();

    api.get('/token', checkToken);

    return api;
  },

  user() {
    const api = Router();

    api.get('/user/:id', getUserData);

    return api;
  },
}