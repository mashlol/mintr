var exec = require('child_process').exec;

var CPU = {};

CPU.monitor = function(history, callback) {
  exec('ps aux', function(error, result) {
    var cpu = 0;

    var lines = result.split('\n');
    lines.splice(0, 1);

    for (var x = 0; x < lines.length; x++) {
      if (!lines[x].trim()) {
        continue;
      }
      cpu += parseFloat(lines[x].split(/\s+/)[2]);
    }

    callback({
      cpu: cpu,
      timestamp: Date.now(),
    });
  });
};

CPU.history = true;
CPU.maxHistory = 3600;
CPU.frequency = 20;

module.exports = CPU;
