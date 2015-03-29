var os = require('os');

var Memory = {};

Memory.monitor = function(history, callback) {
  callback({
    total: os.totalmem(),
    free: os.freemem(),
  });
};

Memory.history = true;
Memory.maxHistory = 3600;
Memory.frequency = 20;

module.exports = Memory;
