var extend = require('extend');

var defaults = {
   bootstrap: false,
   navigation: false,
   avatarWidth: 140,
   pixelRatio: 2,
   unfinished: false
};

module.exports = (settings) => {
   var options = extend(true, {}, defaults, settings);
};