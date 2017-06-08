const fs = require('fs');
const svg2png = require('svg2png');

module.exports = function (dest, d3n, opts, callback) {
  const d3 = d3n.d3;

  if (d3n.options.canvas) {
    const canvas = d3n.options.canvas;
    canvas.pngStream().pipe(fs.createWriteStream(`${dest}.png`));
    console.log(`>> Exported canvas to ${dest}.png`);
    return;
  }

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

  var svgBuffer = new Buffer(svgString, 'utf-8');
  svg2png(svgBuffer, opts || {})
    .then(buffer => fs.writeFileSync(`${dest}.png`, buffer))
    .then(() => {
      console.log(`>> Exported: "${dest}.png"`);
      if (typeof callback === 'function') callback();
    })
    .catch(e => console.error('ERR:', e));
};
