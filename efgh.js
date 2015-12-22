var extend = require('extend');

var pad = require('underscore.string/pad');

var defaults = {
   bootstrap: false,
   navigation: false,
   nodelist: false,
   avatarWidth: 140,
   pixelRatio: 2,
   unfinished: false
};

var dtArrayToString = dtArray => [
   dtArray[0], '-',
   pad(dtArray[1], 2, '0'), '-',
   pad(dtArray[2], 2, '0'),
   ' ',
   pad(dtArray[3], 2, '0'), ':',
   pad(dtArray[4], 2, '0'), ':',
   pad(dtArray[5], 2, '0')
].join('');

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
   var avatarRealWidth = Math.trunc(options.avatarWidth * options.pixelRatio);

   if( Array.isArray(options.origTime) ){
      options.origTime = dtArrayToString(options.origTime);
   }
   if( Array.isArray(options.procTime) ){
      options.procTime = dtArrayToString(options.procTime);
   }

   // Rows:
   // 1) message XXX of YYY, navigation, relations
   // 2) from (with an address and a city), time
   // 3) to, time
   // 4) subject
};