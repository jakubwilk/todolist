const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const cookieParser = require('cookie-parser');

const auth = require('./controllers/user.controller');

require('dotenv').config();

const app = express();
const port = process.env['APP_PORT'] || 32825;
const uri = process.env['ATLAS_URI'];

const bootstrap = () => {

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  passport.localPassport();

  mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
  const connection = mongoose.connection;

  connection.once('open', () => {
    console.log(`[SERVER]: Mongo database connection established successfully`);
  });

  app.use('/api/auth', auth.create());
  app.use('/api/auth', auth.login());

  app.listen(port, () => {
    console.log(`[SERVER]: Server is runing on port: ${port}`);
  });

}

bootstrap();