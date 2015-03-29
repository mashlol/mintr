var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var monitor = require('./monitor');
monitor.on('data', function(data) {
  sendToAllSockets(data);
});

app.use(express.static(__dirname + '/public'));

server.listen(3000);

var sockets = {};

io.on('connection', function (socket) {
  sockets[socket.id] = socket;

  var history = monitor.getHistory();
  socket.emit('history', history);

  socket.on('disconnect', function() {
    delete sockets[socket.id];
  });
});

var sendToAllSockets = function(data) {
  for (var key in sockets) {
    var socket = sockets[key];

    socket.emit('data', data);
  }
};
