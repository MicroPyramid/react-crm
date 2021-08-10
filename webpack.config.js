// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//     entry: './src/index.js',
//     output: {
//       path: path.resolve(__dirname, 'build'),
//       publicPath: '/',
//       filename: 'bundle.js'
//     },
//     devServer: {
//       contentBase: './build',
//     },
//     module: {
//         rules: [{
//           test: /\.(js|jsx)$/,
//           exclude: /node_modules/,
//           use: ['babel-loader'] // include eslint-loader
//         },{
//             test: /\.less$/,
//             use: [
//               'style-loader',
//               'css-loader',
//               'less-loader',
//             ],
//           }]
//       },
//       plugins: [
//         // new HtmlWebpackPlugin({
//         //   template: path.resolve('./index.html'),
//         // }),
//       ]
//   };

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {  

  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname, './build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  
  plugins: [
    new HtmlWebpackPlugin({ 
      template: './public/index.html'      
    }),
       
  ],

  devServer: {          
    public: 'bottlecrm.com', // bottlecrm configurations
    historyApiFallback: true,

    /* ========== Local host configurations ========== */
    // port: <port number>, 
    // public: '<enter the host name as per your config>:<port number>',

  }
}
