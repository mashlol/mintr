// Dependencies
var os = require('os');
var async = require('async');

// Constants
var EMPTY_CALLBACK = function (callback) {
  callback();
};

// Monitors
var monitors = {
  memory: require('./monitors/memory'),
  uptime: require('./monitors/uptime'),
  network: require('./monitors/network'),
  processes: require('./monitors/processes'),
  cpu: require('./monitors/cpu'),
  temps: require('./monitors/temps'),
};

// XXX: Hacky way to prevent us from having to call the callback
// with (null, result) from within the monitors
for (var key in monitors) {
  var monitor = monitors[key];

  (function (monitor) {
    monitor._asyncMonitor = function (history, callback) {
      monitor.monitor(history, function (result) {
        callback(null, result);
      });
    };
  })(monitor);
}

var monitorArray = [];
for (var key in monitors) {
  var monitor = monitors[key];

  monitorArray.push({
    monitor: monitor,
    key: key,
  });
}

monitors = monitorArray;

// Event stuff
var _eventHandlers = {};
var _trigger = function (eventName, data) {
  if (!_eventHandlers[eventName]) {
    return;
  }

  _eventHandlers[eventName].forEach(function (callback) {
    callback && callback(data);
  });
};

// Main
var Monitor = function () {
  this._history = {
    memory: [],
    network: [],
    processes: [],
    temps: [],
  };

  monitors.forEach(function (monitor) {
    if (monitor.monitor.history) {
      this._history[monitor.key] = [];
    }
  }, this);

  this._numData = 0;

  this._monitor();
};

Monitor.prototype.on = function (eventName, callback) {
  _eventHandlers[eventName] = _eventHandlers[eventName] || [];
  _eventHandlers[eventName].push(callback);
};

Monitor.prototype._getData = function (callback) {
  var numData = this._numData++;

  var data = {};

  var monitorAsyncFuncs = monitors.map(function (monitor) {
    if (numData % monitor.monitor.frequency === 0) {
      return monitor.monitor._asyncMonitor.bind(
        null,
        this._history[monitor.key]
      );
    } else {
      return EMPTY_CALLBACK;
    }
  }, this);

  async.parallel(monitorAsyncFuncs, function (error, results) {
    results.forEach(function (result, index) {
      if (result === undefined || result === null) {
        return;
      }

      var monitor = monitors[index];
      var key = monitors[index].key;
      monitor = monitor.monitor;

      data[key] = result;
      data[key].timestamp = Date.now();

      if (monitor.history) {
        this._history[key].push(result);
      } else {
        this._history[key] = result;
      }

      var maxNumHistoryElements = (monitor.maxHistory / monitor.frequency);
      if (this._history[key].length > maxNumHistoryElements) {
        this._history[key].splice(0, 1);
      }
    }, this);
    callback(data);
  }.bind(this));
};

Monitor.prototype.getHistory = function () {
  return this._history;
};

Monitor.prototype._monitor = function () {
  this._getData(function (data) {
    _trigger('data', data);
  });

  setTimeout(this._monitor.bind(this), 1000);
};

module.exports = new Monitor();
