(function() {
  var CPUUsageWidget = function(widget) {
    BaseWidget.call(this, widget);
    this.topDiv = document.createElement('div');
    this.bottomDiv = document.createElement('div');
    this.div.appendChild(this.topDiv);
    this.div.appendChild(this.bottomDiv);
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
      var normalized = data.cpu[data.cpu.length - 1].normalized;
    } else {
      cpu = data.cpu.cpu;
      normalized = data.cpu.normalized;
    }

    this.topDiv.innerText =
      "CPU Load: " + cpu.toFixed(2) + "%";
    this.bottomDiv.innerText =
      "Normalized: " + normalized.toFixed(2) + "% per thread";
  };

  window.CPUUsageWidget = CPUUsageWidget;
})();
