var extend = require('extend');

var defaults = {
   bootstrap: false,
   navigation: false
};

module.exports = (parameters) => {
   var options = extend({}, defaults, parameters);
};