const fs = require('fs');

var Temps = {};

Temps.monitor = function (history, callback) {
  if (!fs.existsSync('/sys/class/thermal')) {
    callback({});
    return;
  }

  const tempSensorDirs = fs.readdirSync('/sys/class/thermal')
    .filter(x => x.startsWith('thermal'));

  const temps = tempSensorDirs.map(dir => {
    const dirType = fs.readFileSync('/sys/class/thermal/' + dir + '/type', { encoding: 'utf8' });
    const dirTemp = fs.readFileSync('/sys/class/thermal/' + dir + '/temp', { encoding: 'utf8' });

    return { type: dirType.trim(), temp: parseInt(dirTemp.trim()) };
  });

  callback(temps);
};

Temps.history = false;
Temps.frequency = 20;

module.exports = Temps;
