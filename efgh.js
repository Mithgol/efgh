var extend = require('extend');

var defaults = {
   bootstrap: false,
   navigation: false,
   nodelist: false,
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
   var XofN = null;
   if( typeof options.navigation.number !== 'undefined' ){
      if( typeof options.navigation.total !== 'undefined' ){
         XofN = `${options.navigation.number} of ${options.navigation.total}`;
      } else XofN = `${options.navigation.number}`;
   }
   var avatarRealWidth = options.avatarWidth * options.pixelRatio;

   // Rows:
   // 1) message XXX of YYY, navigation, relations
   // 2) from (with an address and a city), time
   // 3) to, time
   // 4) subject
};