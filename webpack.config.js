import path from 'path';
import url from 'url';
import CopyWebpackPlugin from 'copy-webpack-plugin';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV == 'production';
const config = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/usersData/usersData.json', to: 'usersData/' }],
    }),
  ],
  target: 'node',
  mode: isProduction ? 'production' : 'development',
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    clean: true,
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
};
export default config;
