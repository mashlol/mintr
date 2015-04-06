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
    return ['#4CAF50', '#1B5E20'];
  },

  CPUChartWidget.prototype.getFillColors = function() {
    return ['rgba(76,175,80,0.05)', 'rgba(27,94,32, 0.05)'];
  };

  CPUChartWidget.prototype.getLabels = function() {
    return ['CPU Usage', 'CPU Usage Per Thread'];
  };

  CPUChartWidget.prototype.getSuffix = function() {
    return "%";
  };

  CPUChartWidget.prototype.getPointsFromHistory = function(history) {
    var dataPoints = [];
    var normalizedDataPoints = [];
    var labels = [];

    history.cpu.forEach(function(data, index) {
      this.numPoints++;

      dataPoints.push(data.cpu.toFixed(2));
      normalizedDataPoints.push(data.normalized.toFixed(2));
      labels.push(
        index % 5 === 0
          ? moment(data.timestamp).format('h:mm:ss')
          : ''
      );
    }, this);

    return {
      values: [dataPoints, normalizedDataPoints],
      labels: labels,
    };
  };

  CPUChartWidget.prototype.getValuesFromData = function(data) {
    if (!data.cpu) {
      return;
    }

    return [data.cpu.cpu.toFixed(2), data.cpu.normalized.toFixed(2)];
  };

  CPUChartWidget.prototype.getLabelFromData = function(data) {
    return moment(data.cpu.timestamp).format('h:mm:ss');
  };

  window.CPUChartWidget = CPUChartWidget;
})();
