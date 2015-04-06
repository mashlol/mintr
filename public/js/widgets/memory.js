(function() {
  var MemoryWidget = function(widget) {
    BaseWidget.call(this, widget);
  };
  MemoryWidget.prototype = Object.create(BaseWidget.prototype);

  MemoryWidget.prototype.getTitle = function() {
    return "Used Memory";
  };

  MemoryWidget.prototype.getWidthClass = function() {
    return "one";
  };

  MemoryWidget.prototype.initialize = function(history) {
    this.addData({
      memory: history.memory[history.memory.length - 1]
    });
  };

  MemoryWidget.prototype.addData = function(data) {
    if (!data.memory) {
      return;
    }

    var usedMemMB =
      Math.floor((data.memory.total - data.memory.free) / 1000000);
    var totalMemMB = Math.floor(data.memory.total / 1000000);

    this.div.innerText =
      "Used Memory: " + usedMemMB + "MB / " + totalMemMB + "MB";
  };

  window.MemoryWidget = MemoryWidget;
})();
