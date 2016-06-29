var escapeHTML = require('lodash.escape');
var extend = require('extend');

var pad = require('underscore.string/pad');

var defaults = {
   navigation: false,
   nodelist: false,
   avatarWidth: 140,
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
   
   return [
      '<table class="table table-bordered table-condensed">',
      '<tr>',
         '<th rowspan=' + rowCount + ' class="avatar inverse" width=1>',
            '<div style="width: ' + options.avatarWidth + 'px;">',
               '&nbsp;',
            '</div>',
         '</th>',
         ( typeof options.URL === 'undefined' ) ? '' : [
            '<tr>',
               '<th class="inverse" nowrap>FGHI URL</th>',
               '<td colspan=3>' +  escapeHTML(options.URL) + '</td>',
            '</tr>'
         ].join(''),
         '<th class="inverse">Msg</th>',
         '<td colspan=3>',
            '<div class="messageNavigation">',
               '<button type="button" class="btn btn-default btn-xs"',
                  disabledBecauseFirst,
               '>',
                  '<i class="fa fa-fast-backward"></i>',
               '</button>',
               '<button type="button" class="btn btn-default btn-xs inner"',
                  disabledBecauseFirst,
               '>',
                  '<i class="fa fa-step-backward"></i>',
               '</button>',
               '<span>',
                  thisMessageNumber + ' of ' + finalMessageNumber,
               '</span>',
               '<button type="button" class="btn btn-default btn-xs inner"',
                  disabledBecauseLast,
               '>',
                  '<i class="fa fa-step-forward"></i>',
               '</button>',
               '<button type="button" class="btn btn-default btn-xs"',
                  disabledBecauseLast,
               '>',
                  '<i class="fa fa-fast-forward"></i>',
               '</button>',
            '</div>',
            '<div class="messageRelations" style="display: none;">',
               '<span class="parent"></span>',
               '<span class="children"></span>',
               '<span class="nextSibling"></span>',
            '</div>',
         '</td>',
      '</tr>',
      '<tr>',
         '<th class="inverse">From</th>',
         '<td>' +  escapeHTML(options.from) + '</td>',
         '<td class="origAddr">',
            '<i class="fa fa-spinner fa-spin"></i>',
         '</td>',
         '<td width=1><nobr>' + options.origTime + '</nobr></td>',
      '</tr>',
      '<tr>',
         '<th class="inverse">To</th>',
         '<td>' + escapeHTML(options.to) + '</td>',
         // decoded.toAddr is traditionally ignored outside of netmail:
         '<td></td>', //'<td>' + (decoded.toAddr ||'') + '</td>',
         '<td width=1><nobr>' + options.procTime + '</nobr></td>',
      '</tr>',
      '<tr>',
         '<th class="inverse">Subj</th>',
         '<td colspan=3>' + escapeHTML(options.subj) + '</td>',
      '</tr>',
      '<tr>',
         '<td colspan=5 class="messageText">',
            '<p style="text-align: center;">',
               '<i class="fa fa-spinner fa-spin"></i>',
            '</p>',
         '</td>',
      '</tr>',
      '</table>'
   ].join('');

};

module.exports = {
   sync: TheSynchronousInterface
};