(function() {
  var CPUUsageWidget = function(widget) {
    BaseWidget.call(this, widget);
  };
  CPUUsageWidget.prototype = Object.create(BaseWidget.prototype);

  CPUUsageWidget.prototype.getTitle = function() {
    return "CPU Load";
  };

  CPUUsageWidget.prototype.getWidthClass = function() {
    return "one";
  };

  CPUUsageWidget.prototype.initialize = function(history) {
    this.addData(history);
  };

  CPUUsageWidget.prototype.addData = function(data) {
    if (!data.processes) {
      return false;
    }

    var processes = data.processes;

    var cpuUsage = 0;
    processes.forEach(function(process) {
      cpuUsage += process.cpu;
    });

    this.div.innerText =
      "CPU Load: " + cpuUsage + " %";
  };

  window.CPUUsageWidget = CPUUsageWidget;
})();
