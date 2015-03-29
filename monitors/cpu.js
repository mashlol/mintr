var os = require('os');
var cpuUsage = require('cpu-usage');

// XXX: This monitor creates its own little monitor thread
// which is a bit of an anti-pattern, but oh well.
var cpu = {
  usage: 0,
};
cpuUsage(1000, function(usage) {
  cpu.usage = usage;
});


var CPU = {};

CPU.monitor = function(history, callback) {
  callback(cpu.usage);
};

CPU.history = false;
// CPU.maxHistory = 3600;
CPU.frequency = 1;

module.exports = CPU;
