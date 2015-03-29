(function() {
  var UptimeWidget = function(widget) {
    BaseWidget.call(this, widget);
  };
  UptimeWidget.prototype = Object.create(BaseWidget.prototype);

  UptimeWidget.prototype.getTitle = function() {
    return "Uptime Information";
  };

  UptimeWidget.prototype.getWidthClass = function() {
    return "one";
  };

  UptimeWidget.prototype.getElement = function() {
    return this.div;
  };

  UptimeWidget.prototype.initialize = function(history) {
    this.addData(history);
  };

  UptimeWidget.prototype.addData = function(data) {
    var uptimeMilli = data.uptime * 1000;
    var duration = moment.duration(uptimeMilli);

    var years = duration.years();
    var months = duration.months();
    var days = duration.days();
    var minutes = duration.minutes();
    var seconds = duration.seconds();

    var times = [
      [years, 'years'],
      [months, 'months'],
      [days, 'days'],
      [minutes, 'minutes'],
      [seconds, 'seconds'],
    ];

    var timeHadValue = false;
    var display = "";
    for (var x = 0; x < times.length; x++) {
      var time = times[x];
      if (timeHadValue || time[0]) {
        display += time[0] + " " + time[1] +
          (x !== times.length - 1 ? ', ' : '');
        timeHadValue = true;
      }
    }

    this.div.innerText = display;
  };

  window.UptimeWidget = UptimeWidget;
})();
