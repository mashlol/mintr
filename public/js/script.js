var socket = io();

window.moveTooltip = function(tooltip, element, middleX) {
  var $tooltip = $('.tooltip');
  if (!tooltip) {
    $tooltip.hide();
    return;
  }

  if (!$tooltip.length) {
    $tooltip = $("<div>").addClass("tooltip");
  }

  if (element) {
    element.appendChild($tooltip[0]);
  } else {
    tooltip.chart.canvas.parentNode.appendChild($tooltip[0]);
  }

  $tooltip.html('');

  var values = tooltip.labels.map(function(label, index) {
    return {
      label: label,
      datasetLabel: tooltip.datasetLabels && tooltip.datasetLabels[index],
      color: tooltip.colors[index],
    };
  });

  values.sort(function(a, b) {
    return parseInt(b.label) - parseInt(a.label);
  });

  values.forEach(function(value) {
    var label = value.label;
    if (value.datasetLabel) {
      label = value.datasetLabel + ': ' + label;
    }

    var $label = $('<div>')
      .text(label)
      .css({
        color: value.color,
      });
    $tooltip.append($label);
  });

  $tooltip.css({
    top: tooltip.y - 20 * (values && values.length || 1),
    left: tooltip.x + 20 -
      (tooltip.x > (middleX || 500) ? $tooltip.width() + 20 : 0),
  });

  $tooltip.show();
};

$(function() {
  Chart.defaults.global.animation = false;

  var container = document.getElementsByClassName('container')[0];

  var createWidget = function(Widget) {
    var widget = document.createElement('div');
    container.appendChild(widget);

    var widgetObj = new Widget(widget);

    widget.className = 'widget ' + widgetObj.getWidthClass();

    var titleEle = document.createElement('div');
    titleEle.className = 'widget-title';

    titleEle.innerText = widgetObj.getTitle();

    var contEle = document.createElement('div');
    contEle.className = 'widget-content';

    widget.appendChild(titleEle);
    widget.appendChild(contEle);

    contEle.appendChild(widgetObj.getElement());

    return widgetObj;
  };

  var widgetClasses = [
    CPUChartWidget,
    FreememWidget,
    NetworkWidget,
    ProcessCPUWidget,
    MemoryWidget,
    UptimeWidget,
    CPUUsageWidget,
    ProcessMemoryWidget,
  ];

  var widgets = widgetClasses.map(function(Widget) {
    return createWidget(Widget);
  });

  socket.on('history', function(history) {
    widgets.forEach(function(widget) {
      widget.initialize(history);
    });
  });

  socket.on('data', function(data) {
    widgets.forEach(function(widget) {
      widget.addData(data);
    });
  });

  // Legend tooltips
  $(".legend").on("mouseover", "li", function(event) {
    var rect = this.getClientRects()[0];
    window.moveTooltip({
      labels: [this.textContent],
      colors: [$(this).find("span").css("background-color")],
      x: rect.left + 30,
      y: rect.top + 30 + window.scrollY,
    }, document.body, 10000);
  });

  $(".legend").on("mouseout", "li", function(event) {
    $(".tooltip").hide();
  });
});
