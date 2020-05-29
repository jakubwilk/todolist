const Router = require('express');
const multer = require('multer');
const { getUserData, getEditUser, postEditUser } = require('./../services/user.service');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
		console.log(req.files);
        cb(null, 'uploads/');
     },
    filename: function (req, file, cb) {
        cb(null , Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = {
	user() {
		const api = Router();

		api.get('/user/:id', getUserData);
		api.get('/edit/:id', getEditUser);
		api.post('/edit', upload.single('file'), postEditUser);

		return api;
	},
}