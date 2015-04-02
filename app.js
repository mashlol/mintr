#!/usr/bin/env node

var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var monitor = require('./monitor');
monitor.on('data', function(data) {
  io.emit('data', data);
});

app.use(express.static(__dirname + '/public'));

var port = parseInt(process.argv[2]) || 3000;
server.listen(port);
console.log("Mintr is listening on port " + port);

var sockets = {};

io.on('connection', function (socket) {
  sockets[socket.id] = socket;

  var history = monitor.getHistory();
  socket.emit('history', history);

  socket.on('disconnect', function() {
    delete sockets[socket.id];
  });
});
