(function() {
  var BaseChartWidget = function(widget) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = widget.clientWidth - 40;
    this.canvas.height = 280;
    this.ctx = this.canvas.getContext('2d');

    this.numPoints = 0;
  };
  BaseChartWidget.prototype = Object.create(BaseWidget.prototype);

  BaseChartWidget.prototype.getElement = function() {
    return this.canvas;
  };

  BaseChartWidget.prototype.getColors = function() {
    return ['#000000'];
  },

  BaseChartWidget.prototype.getFillColors = function() {
    return ['#AAAAAA'];
  };

  BaseChartWidget.prototype.getLabels = function() {
    return ['Label'];
  };

  /*
   * Override to specify a suffix on the values in the chart
   * such as MB, or kB/s
   */
  BaseChartWidget.prototype.getSuffix = function() {
    return "";
  };

  /*
   * Should return an object like:
   * {
   *   values: [[1, 2, 3], [2, 6, 1]],
   *   labels: ['', 'test', ''],
   * }
   */
  BaseChartWidget.prototype.getPointsFromHistory = function(history) {
    throw "Children must override";
  };

  /*
   * Should return an integer
   */
  BaseChartWidget.prototype.getValuesFromData = function(data) {
    throw "Children must override";
  };

  BaseChartWidget.prototype.getLabelFromData = function(data) {
    return "";
  }

  BaseChartWidget.prototype.initialize = function(history) {
    var dataPoints = this.getPointsFromHistory(history);
    var labels = dataPoints.labels;

    var datasets = dataPoints.values.map(function(dataset, index) {
      return {
        fillColor: this.getFillColors()[index],
        strokeColor: this.getColors()[index],
        pointColor: 'rgba(0,0,0,0)',
        pointStrokeColor: 'rgba(0,0,0,0)',
        data: dataset,
      };
    }, this);

    var chartData = {
      labels: labels,
      datasets: datasets,
    };

    this.chart = new Chart(this.ctx).Line(chartData, {
      bezierCurveTension: 0.3,
      animationSteps: 30,
      scaleLabel: "<%= value %> " + this.getSuffix(),
      pointDotRadius: 4,
      scaleShowVerticalLines: false,
      showTooltips: false,
    });

    $(this.canvas).on('mousemove', function(event) {
      var mouseX = event.originalEvent.offsetX || event.originalEvent.layerX;
      var mouseY = event.originalEvent.offsetY || event.originalEvent.layerY;

      this.chart.datasets.forEach(function(dataset) {
        dataset.points.forEach(function(point) {
          point.fillColor = 'rgba(0,0,0,0)';
        });
      });

      var points = this.chart.datasets[0].points;
      var sortedPoints = points.map(function(point, index) {
        return {
          point: point,
          index: index,
        };
      });

      sortedPoints.sort(function(a, b) {
        var aDist = Math.abs(mouseX - a.point.x);
        var bDist = Math.abs(mouseX - b.point.x);

        return aDist - bDist;
      });

      var closestPoint = sortedPoints[0];

      this.chart.datasets.forEach(function(dataset, datasetIndex) {
        var index = sortedPoints[0].index;
        dataset.points[index].fillColor = this.getColors()[datasetIndex];
      }, this);

      this.chart.render(true);

     var labels = this.chart.datasets.map(function(dataset) {
        return dataset.points[closestPoint.index].value +
          ' ' + this.getSuffix();
      }, this);

      moveTooltip({
        chart: this.chart.chart,
        labels: labels,
        colors: this.getColors(),
        datasetLabels: this.getLabels(),
        x: closestPoint.point.x,
        y: closestPoint.point.y,
      });
    }.bind(this));


    $(this.canvas).on('mouseout', function() {
      // Reset all datasets
      this.chart.datasets.forEach(function(dataset) {
        dataset.points.forEach(function(point) {
          point.fillColor = 'rgba(0,0,0,0)';
        });
      });

      this.chart.render(true);

      moveTooltip(false);
    }.bind(this));
  };

  BaseChartWidget.prototype.addData = function(data) {
    var values = this.getValuesFromData(data);

    if (!values) {
      return;
    }

    var index = this.numPoints++;

    this.chart.addData(
      values,
      index % 5 === 0 ? this.getLabelFromData(data) : ''
    );
  };

  window.BaseChartWidget = BaseChartWidget;
})();
