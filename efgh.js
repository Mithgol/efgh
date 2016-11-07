var path = require('path');
var escapeHTML = require('lodash.escape');
var extend = require('extend');

var pad = require('underscore.string/pad');

var defaults = {
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

   if( Array.isArray(options.origTime) ){
      options.origTime = dtArrayToString(options.origTime);
   }
   if( Array.isArray(options.procTime) ){
      options.procTime = dtArrayToString(options.procTime);
   }

   // Rows:
   // 1) from (with an address and a city), time
   // 2) to, time
   // 3) (OPTIONAL) FGHI URL
   // 4) subject
   var rowCount = 4;
   if( typeof options.URL === 'undefined' ) rowCount--;

   var escapedURL = escapeHTML(options.URL);

   return [
      '<table class="table table-bordered table-condensed">',
      '<tr>',
         '<th rowspan=' + rowCount + ' class="avatar inverse" width=1 ',
            'style="background-image: url(', escapeHTML(options.avatarURL),
         ');">',
            '<div style="width: ' + options.avatarWidth + 'px;">',
               '&nbsp;',
            '</div>',
         '</th>',
         '<th class="inverse">From</th>',
         '<td>' +  escapeHTML(options.from) + '</td>',
         '<td>' +  escapeHTML(options.origAddr) + '</td>',
         '<td width=1><nobr>' + options.origTime + '</nobr></td>',
      '</tr>',
      '<tr>',
         '<th class="inverse">To</th>',
         '<td>' + escapeHTML(options.to) + '</td>',
         // decoded.toAddr is traditionally ignored outside of netmail:
         '<td></td>', //'<td>' + (decoded.toAddr ||'') + '</td>',
         '<td width=1><nobr>' + options.procTime + '</nobr></td>',
      '</tr>',
      ( typeof options.URL === 'undefined' ) ? '' : [
         '<tr>',
            '<th class="inverse" nowrap>FGHI URL</th>',
            '<td colspan=3>',
               `<a href="${escapedURL}">${escapedURL}</a>`,
            '</td>',
         '</tr>'
      ].join(''),
      '<tr>',
         '<th class="inverse">Subj</th>',
         '<td colspan=3>' + escapeHTML(options.subj) + '</td>',
      '</tr>',
      ( options.messageHTML === false ) ? '</table>' : [
         '<tr><td colspan=5 class="messageText">',
         ( options.messageHTML === true ) ? '' : (
            `${ options.messageHTML }</td></tr></table>`
         )
      ].join('')
   ].join('');

};

module.exports = {
   sync: TheSynchronousInterface,
   pathCSS: () => path.join(__dirname, 'styles', 'efgh.css')
};