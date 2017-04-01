const fs = require('fs');
const svg2png = require('svg2png');

module.exports = function (dest, d3n, callback) {
  const d3 = d3n.d3;

  function eachGeoQuantize (d) {
    const coords = d3.select(this).attr('d') || ''
    const rounded = coords.replace(/[0-9]*\.[0-9]*/g, (x) => (+x).toFixed(4))
    d3.select(this).attr('d', rounded);
  }

  // reduce size of svg
  d3n.d3Element.selectAll('path').each(eachGeoQuantize);

  fs.writeFile(`${dest}.html`, d3n.html(), function () {
    console.log(`>> Exported "${dest}.html", open in a web browser`)
  });

  const svgString = d3n.svgString();

  fs.writeFile(`${dest}.svg`, svgString, function () {
    console.log(`>> Exported "${dest}.svg"`);
  });

  if (typeof callback === 'function') { // used for testing
    callback(d3n);
  }

  var svgBuffer = new Buffer(svgString, 'utf-8');
  svg2png(svgBuffer)
    .then(buffer => fs.writeFile(`${dest}.png`, buffer))
    .then(() => console.log(`>> Exported: "${dest}.png"`))
    .catch(e => console.error('ERR:', e));
};
