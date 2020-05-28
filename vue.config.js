const path = require('path');
const debug = process.env.NODE_ENV !== "production";

module.exports = {
  publicPath: debug ? "./" : "/page",
  
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/less/theme.less')]
    }
  }
}