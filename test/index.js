const pieChart = require('d3node-piechart');
const fs = require('fs');
const d3 = require('d3-node')().d3;
const output = require('../index');
const csvString = fs.readFileSync('test/data.csv').toString();
var data = d3.csvParse(csvString);

output('dist/test', pieChart(data));
