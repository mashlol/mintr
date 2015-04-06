var exec = require('child_process').exec;
var async = require('async');
var os = require('os');

var Memory = {};

Memory.monitor = function(history, callback) {
  exec('ip -s link', function(error, result) {
    if (error) {
      console.log(
        'Mintr uses `ip` to get network information, which your ' +
        'OS does not support.'
      );
      console.log(error);
      callback({});
      return;
    }

    var data = {
      in: 0,
      out: 0,
    };

    var rx = result.match(/\d+:\s+\w+:\s+[\S\s]*?RX:\s+[\S\s]*?(\d+)/g);
    var tx = result.match(/\d+:\s+\w+:\s+[\S\s]*?TX:\s+[\S\s]*?(\d+)/g);

    for (var x = 0; x < rx.length; x++) {
      var localAmt = rx[x];
      if (localAmt.indexOf('lo:') !== -1) {
        continue;
      }

      data.in += parseInt(localAmt.substring(localAmt.lastIndexOf('\n') + 1));
    }

    for (var x = 0; x < rx.length; x++) {
      var localAmt = tx[x];
      if (localAmt.indexOf('lo:') !== -1) {
        continue;
      }

      data.out += parseInt(localAmt.substring(localAmt.lastIndexOf('\n') + 1));
    }

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
