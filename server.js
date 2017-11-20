// server.js
const express      = require('express');
const MongoClient  = require('mongodb').MongoClient;
const bodyParser   = require('body-parser');
const db           = require('./config/db');
const path         = require('path');
const mongoose     = require('mongoose');
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json())

MongoClient.connect(db.url, (err, database) => {
  if (err) {
    return console.log(err)
  }

  require('./routes')(app, database);

  app.use('/static', express.static(path.join(__dirname, 'public')));

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
  });

  app.listen(port, () => {
    console.info(`Server running on http://localhost:${port}`);
  });
})
