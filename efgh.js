var extend = require('extend');

var pad = require('underscore.string/pad');

var defaults = {
   bootstrap: false,
   navigation: false,
   nodelist: false,
   avatarWidth: 140,
   pixelRatio: 2,
   messageHTML: false
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

var TheSynchronousInterface = settings => {
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
   // 1) (OPTIONAL) FGHI URL
   // 2) (OPTIONAL) message XXX of YYY, navigation, relations
   // 3) from (with an address and a city), time
   // 4) to, time
   // 5) subject
   var rowCount = 5;
   if( typeof options.URL === 'undefined' ) rowCount--;
   if(
      !hasNavButtons && XofN === null && (
         typeof options.navigation.parent.num === 'undefined' ||
         typeof options.navigation.parent.URL === 'undefined'
      ) && (
         !Array.isArray(options.navigation.replies) ||
         options.navigation.replies.length === 0
      )
   ) rowCount--;

};

module.exports = {
   sync: TheSynchronousInterface
};