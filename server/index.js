require('dotenv').config();
const massive = require('massive');
const express = require('express');

const { SERVER_PORT, CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
  console.log('Connected to database.');
  app.set('db', db);
});

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}...`));