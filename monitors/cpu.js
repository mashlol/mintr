var exec = require('child_process').exec;
var os = require('os');

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

    // Also record a normalized CPU usage per thread
    var normalized = cpu / os.cpus().length;

    callback({
      cpu: cpu,
      normalized: normalized,
      timestamp: Date.now(),
    });
  });
};

CPU.history = true;
CPU.maxHistory = 3600;
CPU.frequency = 20;

module.exports = CPU;
