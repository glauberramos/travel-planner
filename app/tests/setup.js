/* eslint no-undef: 0 */
require('babel-register')({
  presets: ['es2015', 'react', 'stage-0']
});

const jsdom = require('jsdom').jsdom;

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('<!doctype><html><head></head><body></body></html>', {
  url: 'http://localhost:3001'
});

global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;
