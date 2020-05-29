const Router = require('express');
const { userValidationRules, registerUser, loginUser, checkToken, getUserData, logoutUser, getEditUser, postEditUser } = require('./../services/user.service');

module.exports = {
	user() {
		const api = Router();

		api.post('/register', userValidationRules(), registerUser); 
		api.post('/login', userValidationRules(), loginUser);
		api.get('/token', checkToken);
		api.get('/user/:id', getUserData);
		api.get('/logout', logoutUser);
		api.get('/edit/:id', getEditUser);
		api.post('/edit', postEditUser);

		return api;
	},
}