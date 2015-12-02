var extend = require('extend');

var defaults = {
   bootstrap: false,
   navigation: false,
   avatarWidth: 140,
   pixelRatio: 2
};

module.exports = (parameters) => {
   var options = extend({}, defaults, parameters);
};