const output = require('../index');
const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="500"><defs><style type="text/css"><![CDATA[ .arc text {font: 10px sans-serif;text-anchor: middle;} .arc path {stroke: #fff;} ]]></style></defs><g transform="translate(480,250)"><g class="arc"><path d="M1.469576158976824e-14,-240A240,240 0 0,1 107.0492887034484,-214.803281604555L0,0Z" style="fill: #98abc5;"></path><text transform="translate(48.113911736435526,-204.41392197553103)" dy=".35em">&lt;5</text></g><g class="arc"><path d="M107.0492887034484,-214.803281604555A240,240 0 0,1 226.32103905324743,-79.86731047092076L0,0Z" style="fill: #8a89a6;"></path><text transform="translate(157.34405840318342,-139.07856515371307)" dy=".35em">5-13</text></g><g class="arc"><path d="M226.32103905324743,-79.86731047092076A240,240 0 0,1 239.89217619670538,7.193316315084522L0,0Z" style="fill: #7b6888;"></path><text transform="translate(207.49417749449054,-32.34449421284646)" dy=".35em">14-17</text></g><g class="arc"><path d="M239.89217619670538,7.193316315084522A240,240 0 0,1 185.29089011249533,152.53617945038215L0,0Z" style="fill: #6b486b;"></path><text transform="translate(196.58564250968948,73.85177830663643)" dy=".35em">18-24</text></g><g class="arc"><path d="M185.29089011249533,152.53617945038215A240,240 0 0,1 -239.7935922865823,9.951537484044003L0,0Z" style="fill: #a05d56;"></path><text transform="translate(-66.78280177123042,199.0981099548274)" dy=".35em">25-44</text></g><g class="arc"><path d="M-239.7935922865823,9.951537484044003A240,240 0 0,1 -25.080788568417415,-238.68588991556737L0,0Z" style="fill: #d0743c;"></path><text transform="translate(-158.9390039857519,-137.25302551134214)" dy=".35em">45-64</text></g><g class="arc"><path d="M-25.080788568417415,-238.68588991556737A240,240 0 0,1 -2.5725010549733476e-13,-240L0,0Z" style="fill: #ff8c00;"></path><text transform="translate(-10.987896250295181,-209.712341401246)" dy=".35em">&gt;65</text></g></g></svg>';
const html = '<html><head></head><body><div id="container"><h2>Pie Chart</h2><div id="chart">'+ svg +'</div></div></body></html>';

const mockD3Node = {
  html: function () {
    return html
  },
  svgString: function () {
    return svg
  }
}

output('dist/test', mockD3Node);
