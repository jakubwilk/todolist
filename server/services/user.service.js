const User = require('../models/user.model');

module.exports = {
  	async getUserData(req, res) {
    	const uid = req.params;
    
    	const user = await User.findById({ _id: uid.id });
    
    	if (user) {
      		return res.send({ status: 200, type: 'success', message: { username: user.email, avatar: user.avatar } });
    	}

    	return res.send({ status: 200, type: 'error', message: { username: 'No username' } });
  	},

	async getEditUser(req, res) {
		const uid = req.params;

		const user = await User.findById({ _id: uid.id });

		if (user) {
			return res.send({ status: 200, type: 'success', user });
		} else {
			return res.send({ status: 401, type: 'error', message: 'No user' });
		}
	},

	async postEditUser(req, res, next) {

	}
}