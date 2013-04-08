
// route-map

var express = require('express')
  , verbose = process.env.NODE_ENV != 'test'

exports = module.exports = function(app) {

  app.map = function(a, route) {
    route = route || ''
    for (var key in a) {
      switch (typeof a[key]) {
        // { '/path': { ... }}
        case 'object':
          app.map(a[key], route + key);
          break;
        // get: function(){ ... }
        case 'function':
          if (verbose) console.log('%s %s', key, route)
          app[key](route, a[key]);
          break;
      }
    }
  }

}