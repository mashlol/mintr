var exec = require('child_process').exec;

var MAX_NAME_LENGTH = 40;

var Processes = {};

Processes.monitor = function(history, callback) {
  exec('ps aux', function(error, result) {
    var processes = [];

    var lines = result.split('\n');
    lines.splice(0, 1);

    for (var x = 0; x < lines.length; x++) {
      var line = lines[x];
      if (!line.trim()) {
        continue;
      }
      var process = {};
      var words = line.split(/\s+/);
      process.user = words[0];
      process.pid = parseInt(words[1]);
      process.cpu = parseFloat(words[2]);
      process.mem = parseFloat(words[3]);
      var name = words[10];
      for (var y = 11; y < words.length; y++) {
        name += ' ' + words[y];
      }
      process.name = name && name.substring(0, MAX_NAME_LENGTH);

      processes.push(process);
    }

    var topCPU = processes.sort(function(a, b) {
      return b.cpu - a.cpu;
    }).slice(0, 5);
    var topMem = processes.sort(function(a, b) {
      return b.mem - a.mem;
    }).slice(0, 5);

    var topProcesses = [];
    var topPIDs = {};
    for (var x = 0; x < topCPU.length; x++) {
      topPIDs[topCPU[x].pid] = true;
      topProcesses.push(topCPU[x]);
      if (!topPIDs[topMem[x].pid]) {
        topPIDs[topMem[x].pid] = true;
        topProcesses.push(topMem[x]);
      }
    }

    callback(topProcesses);
  });
};

Processes.history = false;
Processes.frequency = 20;

module.exports = Processes;
