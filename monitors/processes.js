var exec = require('child_process').exec;

var Processes = {};

Processes.monitor = function(history, callback) {
  exec('ps aux', function(error, result) {
    var data = [];

    var lines = result.split('\n');
    lines.splice(0, 1);

    for (var x = 0; x < lines.length; x++) {
      var line = lines[x];
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
      process.name = name;

      data.push(process);
    }

    callback(data);
  });
};

Processes.history = false;
Processes.frequency = 20;

module.exports = Processes;
