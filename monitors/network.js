var exec = require('child_process').exec;

var Memory = {};

Memory.monitor = function(history, callback) {
  exec('ifconfig', function(error, result) {
    var data = {};

    var lineBreaks = result.indexOf('\n\n');

    var rxBytes = result.indexOf('RX bytes:', lineBreaks);
    var end = result.indexOf(' ', rxBytes+9);

    data.in = parseInt(result.substring(rxBytes+9, end));

    var txBytes = result.indexOf('TX bytes:', lineBreaks);
    var end = result.indexOf(' ', txBytes+9);

    data.out = parseInt(result.substring(txBytes+9, end));

    data.timestamp = Date.now();

    // Now calculate speeds
    if (history.length > 0) {
      var amountBack = 1;
      var index = history.length - amountBack;
      var lastTimestamp = history[index].timestamp;
      var lastOut = history[index].out;
      var lastIn = history[index].in;

      var elapsedTime = data.timestamp - lastTimestamp;
      var deltaOut = data.out - lastOut;
      var deltaIn = data.in - lastIn;

      data.outSpeed = deltaOut / elapsedTime * 1000;
      data.inSpeed = deltaIn / elapsedTime * 1000;
    } else {
      data.outSpeed = 0;
      data.inSpeed = 0;
    }

    callback(data);
  });
};

Memory.history = true;
Memory.maxHistory = 3600;
Memory.frequency = 20;

module.exports = Memory;
