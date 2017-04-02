# D3Node-output

Used in examples to export a d3node instance to html, svg, & png files

## Install

```bash
npm install d3node-output
```

### Usage
```js
const output = require('d3node-output')
const voronoi = require('d3node-voronoi');
const data = new Array(99);

// output files to /dist dir
output('./dist/myVoronoi', voronoi(data));
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


### LICENSE

[MIT](LICENSE) &copy; [d3-node](https://github.com/d3-node)