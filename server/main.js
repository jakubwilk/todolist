const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const auth = require('./controllers/auth.controller');
const user = require('./controllers/user.controller');

require('dotenv').config();

const app = express();
const port = process.env['APP_PORT'] || 32825;
const uri = process.env['ATLAS_URI'];

const bootstrap = () => {

	app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
	app.use(cookieParser());
	app.use(express.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
	const connection = mongoose.connection;

	connection.once('open', () => {
		console.log(`[SERVER]: Mongo database connection established successfully`);
	});

	app.use('/uploads', express.static(__dirname + '/uploads'));
	app.use('/api/auth', auth.user());
	app.use('/api/user', user.user());

	app.listen(port, () => {
		console.log(`[SERVER]: Server is runing on port: ${port}`);
	});

}

bootstrap();