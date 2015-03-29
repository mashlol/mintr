(function() {
  var COLORS = ['#F44336', '#3F51B5', '#4CAF50', '#00BCD4', '#FF9800'];

  var ProcessMemoryWidget = function(widget) {
    BasePieWidget.call(this, widget);
  };
  ProcessMemoryWidget.prototype = Object.create(BasePieWidget.prototype);

  ProcessMemoryWidget.prototype.getTitle = function() {
    return "Process Memory Usage";
  };

  ProcessMemoryWidget.prototype.getSuffix = function() {
    return "% Memory";
  };

  ProcessMemoryWidget.prototype.getChartData = function(data) {
    if (!data.processes) {
      return false;
    }

    var processes = data.processes;

    processes.sort(function(a, b) {
      return b.mem - a.mem;
    });

    processes = processes.slice(0, 5);

    var chartData = [];
    processes.forEach(function(process, index) {
      chartData.push({
        value: process.mem,
        color: COLORS[index],
        label: process.name,
      });
    });

    return chartData;
  };

  window.ProcessMemoryWidget = ProcessMemoryWidget;
})();
