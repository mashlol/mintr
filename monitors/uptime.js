var os = require('os');

var Uptime = {};

Uptime.monitor = function(history, callback) {
  callback(os.uptime());
};

Uptime.history = false;
Uptime.frequency = 1;

module.exports = Uptime;
