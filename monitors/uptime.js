var os = require('os');
var exec = require('child_process').exec;

var Uptime = {};

Uptime.monitor = function(history, callback) {
  exec('ps -eo lstart,args | grep /sbin/init', function(error, result) {
    var processTextIndex = result.indexOf('/sbin/init');
    var dateText = result.substring(0, processTextIndex);
    var uptime = Date.now() - new Date(dateText).getTime();

    callback(uptime);
  });
};

Uptime.history = false;
Uptime.frequency = 1;

module.exports = Uptime;
