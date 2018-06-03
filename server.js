const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');

const api = require('./src/api');

const app = express();
const port = 3000;

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

// setting /api route as the default api route of the application
app.use('/api', api);

app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
})

// start listening for requests on the given port
app.listen(port, () => {
  console.log("Server running on port:" + port);
});

module.exports = app;