var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'readbook'
    },
    port: process.env.PORT || 1234,
    db: 'mongodb://abang:123456@ds054619.mlab.com:54619/readbook'
  },

  test: {
    root: rootPath,
    app: {
      name: 'readbook'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/readbook-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'readbook'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/readbook-production'
  }
};

module.exports = config[env];
