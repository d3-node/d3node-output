const pieChart = require('d3node-piechart');
const fs = require('fs');
const assert = require('assert');
const d3 = require('d3-node')().d3;
const output = require('../index');
const csvString = fs.readFileSync('test/data.csv').toString();
var data = d3.csvParse(csvString);

const chart = pieChart(data);

// test camelCase in svgString
chart.d3Element.select('svg').append('radialGradient').attr('offset', '0%');

output('dist/test', chart, () => {
  // assertion test
  try {
    const expectedSvg = fs.readFileSync('test/expected.svg', 'utf-8');
    assert.equal(chart.svgString(), expectedSvg);
  } catch (ex) {
    console.log(ex);
  }
});

