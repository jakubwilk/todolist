const Router = require('express');
const { userValidationRules, registerUser, loginUser, checkToken, getUserData, logoutUser } = require('./../services/user.service');

module.exports = {
	user() {
		const api = Router();

		api.post('/register', userValidationRules(), registerUser); 
		api.post('/login', userValidationRules(), loginUser);
		api.get('/token', checkToken);
		api.get('/user/:id', getUserData);
		api.get('/logout', logoutUser);

		return api;
	},

//   	create() {
//     	const api = Router();

//     	api.post('/register', userValidationRules(), registerUser); 

//     	return api;
//   	},

//   login() {
//     const api = Router();

//     api.post('/login', userValidationRules(), loginUser);

//     return api;
//   },

//   verify() {
//     const api = Router();

//     api.get('/token', checkToken);

//     return api;
//   },

//   user() {
//     const api = Router();

//     api.get('/user/:id', getUserData);

//     return api;
//   },

//   logout() {
//     const api = Router();

//     api.post('/logout', logoutUser);

//     return api;
//   }
}