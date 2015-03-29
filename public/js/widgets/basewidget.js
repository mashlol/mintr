(function() {
  var BaseWidget = function(widget) {
    this.div = document.createElement('div');
  };

  BaseWidget.prototype.getTitle = function() {
    return "Base Widget";
  };

  BaseWidget.prototype.getWidthClass = function() {
    return "one";
  };

  BaseWidget.prototype.getElement = function() {
    return this.div;
  };

  BaseWidget.prototype.initialize = function(history) {
  };

  BaseWidget.prototype.addData = function(data) {
  };

  window.BaseWidget = BaseWidget;
})();
