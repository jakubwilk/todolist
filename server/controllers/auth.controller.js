const Router = require('express');
const { userValidationRules, registerUser, loginUser, checkToken, logoutUser } = require('./../services/auth.service');

module.exports = {
	user() {
		const api = Router();

		api.post('/register', userValidationRules(), registerUser); 
		api.post('/login', userValidationRules(), loginUser);
        api.get('/token', checkToken);
        api.get('/logout', logoutUser);

		return api;
	},
}