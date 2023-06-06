(function () {
  var TempsWidget = function (widget) {
    BaseWidget.call(this, widget);

    this.divs = [];

    // this.topDiv = document.createElement('div');
    // this.bottomDiv = document.createElement('div');
    // this.div.appendChild(this.topDiv);
    // this.div.appendChild(this.bottomDiv);
  };
  TempsWidget.prototype = Object.create(BaseWidget.prototype);

  TempsWidget.prototype.getTitle = function () {
    return "Temperature Sensors";
  };

  TempsWidget.prototype.getWidthClass = function () {
    return "one";
  };

  TempsWidget.prototype.initialize = function (history) {
    this.addData(history);
  };

  TempsWidget.prototype.addData = function (data) {
    if (!data.temps) {
      return false;
    }

    // const latestData = data.temps[data.temps.length - 1];

    console.log(data.temps);

    // TODO we might wanna support removing divs if the number of sensors goes
    // down somehow during runtime.
    if (this.divs.length < data.temps.length) {
      const numDivsToCreate = data.temps.length - this.divs.length;
      for (let x = 0; x < numDivsToCreate; x++) {
        const div = document.createElement('div');
        this.div.appendChild(div);
        this.divs.push(div);
      }
    }

    data.temps.forEach((tempData, idx) => {
      const tempC = tempData.temp / 1000;
      this.divs[idx].innerText = `${tempData.type}: ${tempC}°C`;
    });
  };

  window.TempsWidget = TempsWidget;
})();
