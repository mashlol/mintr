(function() {
  var CPUChartWidget = function(widget) {
    BaseChartWidget.call(this, widget);
  };
  CPUChartWidget.prototype = Object.create(BaseChartWidget.prototype);

  CPUChartWidget.prototype.getTitle = function() {
    return "CPU Usage";
  };

  CPUChartWidget.prototype.getWidthClass = function() {
    return "three";
  };

  CPUChartWidget.prototype.getColors = function() {
    return ['#4CAF50'];
  },

  CPUChartWidget.prototype.getFillColors = function() {
    return ['rgba(76,175,80,0.05)'];
  };

  CPUChartWidget.prototype.getLabels = function() {
    return ['CPU Usage'];
  };

  CPUChartWidget.prototype.getSuffix = function() {
    return "%";
  };

  CPUChartWidget.prototype.getPointsFromHistory = function(history) {
    var dataPoints = [];
    var labels = [];

    history.cpu.forEach(function(data, index) {
      this.numPoints++;

      dataPoints.push(Math.floor(data.cpu));
      labels.push(
        index % 5 === 0
          ? moment(data.timestamp).format('h:mm:ss')
          : ''
      );
    }, this);

    return {
      values: [dataPoints],
      labels: labels,
    };
  };

  CPUChartWidget.prototype.getValuesFromData = function(data) {
    if (!data.cpu) {
      return;
    }

    return [
      Math.floor(data.cpu.cpu),
    ];
  };

  CPUChartWidget.prototype.getLabelFromData = function(data) {
    return moment(data.cpu.timestamp).format('h:mm:ss');
  };

  window.CPUChartWidget = CPUChartWidget;
})();
