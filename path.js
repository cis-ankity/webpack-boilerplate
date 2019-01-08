const path = require('path');

const PATHS = {
  client: path.join(__dirname, './client'),
  src: path.join(__dirname, './client/src'),
  dist: path.join(__dirname, './client/dist'),
  css: path.join(__dirname, './client/dist/css'),
  public: path.join(__dirname, './public'),
};

module.exports = PATHS;
