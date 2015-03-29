(function() {
  var COLORS = ['#F44336', '#3F51B5', '#4CAF50', '#00BCD4', '#FF9800'];

  var ProcessCPUWidget = function(widget) {
    BasePieWidget.call(this, widget);
  };
  ProcessCPUWidget.prototype = Object.create(BasePieWidget.prototype);

  ProcessCPUWidget.prototype.getTitle = function() {
    return "Process CPU Usage";
  };

  ProcessCPUWidget.prototype.getSuffix = function() {
    return "% CPU";
  };

  ProcessCPUWidget.prototype.getChartData = function(data) {
    if (!data.processes) {
      return false;
    }

    var processes = data.processes;

    processes.sort(function(a, b) {
      return b.cpu - a.cpu;
    });

    processes = processes.slice(0, 5);

    var chartData = [];
    processes.forEach(function(process, index) {
      chartData.push({
        value: process.cpu,
        color: COLORS[index],
        label: process.name,
      });
    });

    return chartData;
  };

  window.ProcessCPUWidget = ProcessCPUWidget;
})();
