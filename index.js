const fs = require('fs');
const svg2png = require('svg2png');

module.exports = function (dest, d3n) {

  fs.writeFile(dest+'.html', d3n.html(), function () {
    console.log('>> Exported "'+ dest +'.html", open in a web browser');
  });

  var svgBuffer = new Buffer(d3n.svgString(), 'utf-8');
  svg2png(svgBuffer)
    .then(buffer => fs.writeFile(dest+'.png', buffer))
    .catch(e => console.error('ERR:', e))
    .then(err => console.log('>> Exported: "'+dest+'.png"'));
};
