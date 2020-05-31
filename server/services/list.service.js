const { body, validationResult } = require('express-validator')
const List = require('../models/list.model');
const User = require('../models/user.model');

const listValidationRules = () => {
	return [
    	body('title', 'Title field contains invalid characters').not().isEmail().escape().trim(),
    	body('description', 'Description field contains invalid characters').not().escape().trim(),
  	]
}

module.exports = {
    listValidationRules,

    async getUserLists(req, res) {
        const uid = req.params;

        const user = User.findById({ id: uid });

        if (!user) {
            res.send({ status: 400, type: 'error', message: ['User not found'] });
        }

        const lists = await List.find({ uid: uid });

        if (!lists) {
            return res.send({ status: 200, type: 'error', message: ['You do not have any lists yet. Create the first one'] });
        }

        return res.send({ status: 200, type: 'success', message: lists });
    },

    async createUserList(req, res) {
        const { title, description, author } = req.body;
        const errors = validationResult(req);
		const errorsMessage = [];

    	if (!errors.isEmpty()) {
     		errors.array().map(error => errorsMessage.push(error.msg));
    	}

    	if (errorsMessage.length !== 0) {
      		return res.send({ status: 200, type: 'error', message: errorsMessage });
        }
        
        if (title.length > 60) {
			return res.send({ status: 200, type: 'error', message: ['Field title is too long (max. 60 characters)'] });
        }
        
        if (description.length > 300) {
			return res.send({ status: 200, type: 'error', message: ['Field description is too long (max. 300 characters)'] });
		}

        const user = User.findById({ id: author });

        if (!user) {
            res.send({ status: 400, type: 'error', message: ['User not found'] });
        }

        const list = new List({ title: title, description: description, uid: author, finished: false });
        list.save()
            .then(list => {
                return res.send({ status: 200, type: 'success', message: ['List successfully created'] });
            })
            .catch(err => {
                return res.send({ status: 500, type: 'error', message: ['Error while processing your query'] });
            });
    }
}