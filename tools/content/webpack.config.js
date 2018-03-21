const {resolve, join} = require('path');
const spawn = require('child_process').spawn;
const SuppressChunksPlugin = require('suppress-chunks-webpack-plugin').default;

// Webpack is intentionally not saved under (dev-)dependencies to prevent breaking angular-cli
const {NoEmitOnErrorsPlugin} = require('webpack');

function RunOutputPlugin(options) {
}

RunOutputPlugin.prototype.apply = function (compiler) {
  compiler.plugin("emit", function (compilation, cb) {
    const entry = compilation.chunks.filter((c) => c.hasRuntime());
    const files = entry.map((c) => c.files[0]);
    const assets = files.map((f) => compilation.assets[f]);
    const source = assets.map((a) => a.source()).join('\n');
    const proc = spawn(process.execPath, {stdio: ['pipe', 'pipe', 'inherit'], cwd: process.cwd()});
    proc.stdin.end(source, 'utf8');
    cb();
  });
};
module.exports = {
  target: 'node',
  devtool: false,
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: {
    content: join(__dirname, './index.ts')
  },
  output: {
    path: join(__dirname, '../../website/src/assets'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {test: /\.ts$/, loader: 'ts-loader'}
    ]
  },
  resolveLoader: {
    modules: [
      'node_modules',
      resolve(__dirname, '..', 'scripts', 'loaders')
    ]
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new RunOutputPlugin(),
    new SuppressChunksPlugin(['content'])
  ]
};
