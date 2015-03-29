(function() {
  var NetworkWidget = function(widget) {
    BaseChartWidget.call(this, widget);
  };
  NetworkWidget.prototype = Object.create(BaseChartWidget.prototype);

  NetworkWidget.prototype.getTitle = function() {
    return "Network Activity";
  };

  NetworkWidget.prototype.getWidthClass = function() {
    return "three";
  };

  NetworkWidget.prototype.getColors = function() {
    return ['#F44336', '#B71C1C'];
  },

  NetworkWidget.prototype.getFillColors = function() {
    return ['rgba(244,67,54,0.05)', 'rgba(183,28,28,0.05)'];
  };

  NetworkWidget.prototype.getLabels = function() {
    return ['Incoming Speed', 'Outgoing Speed'];
  };

  NetworkWidget.prototype.getSuffix = function() {
    return "kB/s";
  };

  NetworkWidget.prototype.getPointsFromHistory = function(history) {
    var inDataPoints = [];
    var outDataPoints = [];
    var labels = [];

    history.network.forEach(function(data, index) {
      this.numPoints++;

      inDataPoints.push(Math.floor(data.inSpeed / 1000));
      outDataPoints.push(Math.floor(data.outSpeed / 1000));
      labels.push(
        index % 5 === 0
          ? moment(data.timestamp).format('h:mm:ss')
          : ''
      );
    }, this);

    return {
      values: [inDataPoints, outDataPoints],
      labels: labels,
    };
  };

  NetworkWidget.prototype.getValuesFromData = function(data) {
    if (!data.network) {
      return;
    }

    return [
      Math.floor(data.network.inSpeed / 1000),
      Math.floor(data.network.outSpeed / 1000)
    ];
  };

  NetworkWidget.prototype.getLabelFromData = function(data) {
    return moment(data.network.timestamp).format('h:mm:ss');
  };

  window.NetworkWidget = NetworkWidget;
})();
