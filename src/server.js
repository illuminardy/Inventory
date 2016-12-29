const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// DB CONNECTION -------------------------------
const mongoose = require('mongoose');
const { DB_HOST, DB_PORT, DB_NAME } = process.env;
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, (err, db) => {
  if (err) {
    throw new Error('Unable to connect to the server. Error:', err);
  }
});

// ROUTES -------------------------------
const router = express.Router();
app.use('/stock', require('./routes/stock'));

// START THE SERVER -------------------------------
app.listen(8080, function() {
  console.log('Express server listening on port:8080');
});

module.exports = app; // For Testing
