const fs = require('fs');
const puppeteer = require('puppeteer');

function captureImage (html, { jpeg = false, quality, path, viewport }) {
  const screenShotOptions = { viewport, path, quality };
  if (jpeg) {
    screenShotOptions.type = 'jpeg'
  }

  return puppeteer.launch()
  .then((browser) => {
    browser.newPage()
    .then((page) => {
      page.setContent(html)
      page.screenshot(screenShotOptions)
      .then(() => browser.close())
      .then(() => console.log('>> Exported:', screenShotOptions.path))
      .catch(console.error);
    })
  })
  .catch(console.error)
}

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

  // reduce filesize of svg
  d3n.d3Element.selectAll('path').each(eachGeoQuantize);

  fs.writeFile(`${dest}.html`, d3n.html(), function () {
    console.log(`>> Exported "${dest}.html", open in a web browser`)
  });

  const svgString = d3n.svgString();
  fs.writeFile(`${dest}.svg`, svgString, function () {
    console.log(`>> Exported "${dest}.svg"`);
  });

  const { width, height, jpeg, quality } = opts;
  const viewport = { width, height }
  const ext = jpeg ? 'jpg' : 'png'
  captureImage(d3n.html(), { jpeg, quality, path: `${dest}.${ext}`, viewport })
  .then(() => {
    if (typeof callback === 'function') callback();
  })
};
