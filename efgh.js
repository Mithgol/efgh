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
   var hasNavButtons = (
      typeof options.navigation.first !== 'undefined' ||
      typeof options.navigation.prev !== 'undefined' ||
      typeof options.navigation.next !== 'undefined' ||
      typeof options.navigation.last !== 'undefined'
   );
};