const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const DataHub = require('macaca-datahub');
const datahubMiddleware = require('datahub-proxy-middleware');
const Dotenv = require('dotenv-webpack');


const datahubConfig = {
  port: 5678,
  hostname: '127.0.0.1',
  store: path.join(__dirname, 'data'),
  proxy: {
    '/api': {
      hub: 'sample',
    },
  },
  showBoard: true,
};

const defaultDatahub = new DataHub({
  port: datahubConfig.port,
});

module.exports = {
  mode: 'development',
  watch:true,
  entry: './src/index.js',
   devServer: {
    before: app => {
      datahubMiddleware(app)(datahubConfig);
    },
    after: () => {
      defaultDatahub.startServer(datahubConfig).then(() => {
        console.log('datahub ready');
      });
    },
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /test\.js$/,
        use: 'mocha-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    new Dotenv({
      path:'.env'
    })
  ]
};