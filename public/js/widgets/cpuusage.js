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
    if (data.cpu === undefined) {
      return;
    }

    this.div.innerText =
      "CPU Load: " + data.cpu + " %";
  };

  window.CPUUsageWidget = CPUUsageWidget;
})();
