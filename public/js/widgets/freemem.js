(function() {
  var FreememWidget = function(widget) {
    BaseChartWidget.call(this, widget);
  };
  FreememWidget.prototype = Object.create(BaseChartWidget.prototype);

  FreememWidget.prototype.getTitle = function() {
    return "Free Memory";
  };

  FreememWidget.prototype.getWidthClass = function() {
    return "three";
  };

  FreememWidget.prototype.getColors = function() {
    return ['#1E88E5'];
  },

  FreememWidget.prototype.getFillColors = function() {
    return ['rgba(30,136,229,0.05)'];
  };

  FreememWidget.prototype.getLabels = function() {
    return ['Free Memory'];
  };

  FreememWidget.prototype.getSuffix = function() {
    return "MB";
  };

  FreememWidget.prototype.getPointsFromHistory = function(history) {
    var dataPoints = []
    var labels = [];
    history.memory.forEach(function(data, index) {
      this.numPoints++;

      dataPoints.push(Math.floor(data.free / 1000000));
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

  FreememWidget.prototype.getValuesFromData = function(data) {
    if (!data.memory) {
      return;
    }

    return [Math.floor(data.memory.free / 1000000)];
  };

  FreememWidget.prototype.getLabelFromData = function(data) {
    return moment(data.memory.timestamp).format('h:mm:ss');
  };

  window.FreememWidget = FreememWidget;
})();
