var fs = require('fs');
var http = require('http');
var express = require('express');
var path = require('path');


var hosting = 'localhost';

var app = express();

// data format
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

  app.post('/email', (req, res) => {
    // TODO:
    console.log('Data: ', req.body);
    res.json({ message: 'Message received'});
  });

app.use(express.static(path.join(__dirname + '/views')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

var port = process.env.port || 8080;

app.listen(port, hosting, () => console.log(`Server started on port ${port}`));
