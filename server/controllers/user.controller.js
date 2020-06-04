const Router = require('express');
const { userValidationRules, getUserData, getEditUser, postEditUser } = require('./../services/user.service');

module.exports = {
	user() {
		const api = Router();

		api.get('/user/:id', getUserData);
		api.get('/edit/:id', getEditUser);
		api.put('/edit', userValidationRules(), postEditUser);

		return api;
	},
}
