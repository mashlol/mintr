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
    if (!data.cpu) {
      return false;
    }

    if (data.cpu.length) {
      var cpu = data.cpu[data.cpu.length - 1].cpu;
    } else {
      cpu = data.cpu.cpu;
    }

    this.div.innerText =
      "CPU Load: " + cpu.toFixed(2) + " %";
  };

  window.CPUUsageWidget = CPUUsageWidget;
})();
