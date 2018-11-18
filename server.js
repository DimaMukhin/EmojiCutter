const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const RateLimit = require('express-rate-limit');
const api = require('./server/api');

const app = express();
const port = process.env.PORT || 4000;

// connecting React front-end with express back-end
app.use(express.static(path.join(__dirname, './build')));

// setting json parsing of http requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setting file upload
app.use(
  fileUpload({
    limits: { fileSize: 500 * 1024 }
  })
);

// enabling cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// express-rate-limit
app.enable('Heroku');

let apiLimiter = new RateLimit({
  windowMs: 1 * 30 * 1000, // 30 seconds
  max: 1, // limit each IP to 1 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
  skipFailedRequests: true
});

app.use('/api/emoji', apiLimiter); // only apply to /api/emoji requests

// setting /api route as the default api route of the application
app.use('/api', api);

// all other routes redirect to React front-end
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

// start listening for requests on the given port
app.listen(port, () => {
  console.log('Server running on port:' + port);
});

module.exports = app;
