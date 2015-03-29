(function() {
  var COLORS = ['#F44336', '#3F51B5', '#4CAF50', '#00BCD4', '#FFEB3B'];

  var BasePieWidget = function(widget) {
    this.div = document.createElement('div');
    this.div.className = 'pie';

    this.canvas = document.createElement('canvas');
    this.canvas.width = 250;
    this.canvas.height = 250;
    this.ctx = this.canvas.getContext('2d');

    this.legendDiv = document.createElement('div');
    this.legendDiv.className = 'legend';

    this.div.appendChild(this.canvas);
    this.div.appendChild(this.legendDiv);

    this.numPoints = 0;
  };
  BasePieWidget.prototype = Object.create(BaseWidget.prototype);

  BasePieWidget.prototype.getElement = function() {
    return this.div;
  };

  BasePieWidget.prototype.getWidthClass = function() {
    return "two";
  };

  /*
   * Override to specify a suffix on the values in the chart
   * such as MB, or kB/s
   */
  BasePieWidget.prototype.getSuffix = function() {
    return "";
  };

  BasePieWidget.prototype.initialize = function(history) {
    this.addData(history);
  };

  BasePieWidget.prototype.getChartData = function(data) {
    throw "Children must override";
  };

  BasePieWidget.prototype.addData = function(data) {
    var index = this.numPoints++;

    var data = this.getChartData(data);

    if (!data) {
      return;
    }

    this.chart && this.chart.destroy();

    this.chart = new Chart(this.ctx).Doughnut(data, {
      animateScale: index === 0,
      animateRotate : index === 0,
      tooltipTemplate: "<%= fillColor %>|<%= label %>: <%= value %>"
        + this.getSuffix(),
      customTooltips: function(tooltip) {
        if (!tooltip) {
          $(".tooltip").hide();
          return;
        }

        var textSplit = tooltip.text.split("|");
        var color = textSplit[0];

        tooltip.labels = [textSplit[1]];
        // tooltip.datasetLabels = [''];
        tooltip.colors = [color];

        window.moveTooltip(tooltip);
      }.bind(this),
      legendTemplate:
        '<ul class=\"<%=name.toLowerCase()%>-legend\">' +
          '<% for (var i=0; i<segments.length; i++){%>' +
            '<li>' +
              '<span style=\"background-color:<%=segments[i].fillColor%>\">' +
              '</span>' +
                '<%=segments[i].value%>' + this.getSuffix() +
                  ': <%=segments[i].label%>' +
            '</li>' +
          '<%}%>' +
        '</ul>'
    });

    this.legendDiv.innerHTML = this.chart.generateLegend();
  };


  window.BasePieWidget = BasePieWidget;
})();
