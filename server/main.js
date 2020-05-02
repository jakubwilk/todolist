const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env['APP_PORT'] || 32825;
const uri = process.env['ATLAS_URI'];

const bootstrap = () => {

  app.use(cors());
  app.use(express.json());

  mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
  const connection = mongoose.connection;

  connection.once('open', () => {
    console.log(`[SERVER]: Mongo database connection established successfully`);
  });

  app.listen(port, () => {
    console.log(`[SERVER]: Server is runing on port: ${port}`);
  });

}

bootstrap();