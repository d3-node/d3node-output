const fs = require('fs');
const svg2png = require('svg2png');

module.exports = function (dest, d3n) {
  const d3 = d3n.d3;

  function eachGeoQuantize(d) {
    const d3 = d3n.d3;
    const coords = d3.select(this).attr('d') || ''
    const rounded = coords.replace(/[0-9]*\.[0-9]*/g, (x) => (+x).toFixed(4))
    d3.select(this).attr('d', rounded)
  }

  // reduce size of svg
  d3n.d3Element.selectAll('path').each(eachGeoQuantize);

  fs.writeFile(dest+'.html', d3n.html(), function () {
    console.log('>> Exported "'+ dest +'.html", open in a web browser');
  });

  var svgBuffer = new Buffer(d3n.svgString(), 'utf-8');
  svg2png(svgBuffer)
    .then(buffer => fs.writeFile(dest+'.png', buffer))
    .catch(e => console.error('ERR:', e))
    .then(err => console.log('>> Exported: "'+dest+'.png"'));
};
