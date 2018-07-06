const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');

const api = require('./src/api');

const app = express();
const port = process.env.PORT || 3000;

// setting json parsing of http requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setting file upload
app.use(fileUpload());

// enabling cors 
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// connecting React front-end with express back-end
app.use(express.static(path.join(__dirname, '../build')));

// setting /api route as the default api route of the application
app.use('/api', api);

// all other routes redirect to React front-end
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// start listening for requests on the given port
app.listen(port, () => {
  console.log("Server running on port:" + port);
});

module.exports = app;