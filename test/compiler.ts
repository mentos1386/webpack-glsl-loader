import * as path from 'path';
import * as webpack from 'webpack';
import * as memoryfs from 'memory-fs';

export default (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: `${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /\.(glsl|vs|fs)$/,
        use: {
          loader: path.resolve(__dirname, '../lib/loader.ts'),
          options: {
            name: 'Alice'
          }
        }
      }]
    }
  });

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);

      resolve(stats);
    });
  });
}