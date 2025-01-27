const express = require('express')
const app = express()
const routes = require('./routes/route');
const bodyParser = require('body-parser');

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
      express.json({ limit: '1024mb' })(req, res, next);
   
  });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
// app.use(express.static('public'));
app.use("/blog_images/", express.static(__dirname + "/public/blog_images/"));
app.use(routes)

module.exports = app;