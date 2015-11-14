var extend = require('extend');

var defaults = {
};

module.exports = (parameters) => {
   var options = extend({}, defaults, parameters);
};