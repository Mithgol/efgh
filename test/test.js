/* global describe, it */
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var syncEFGH = require('../').sync;

describe(
   'EFGH synchronous interface',
   () => [
      {
         source: 'noMessage.json',
         result: 'noMessage.html',
         title: 'converts a header where `URL` and `messageHTML` are missing'
      },
      {
         source: 'openForMessage.json',
         result: 'openForMessage.html',
         title: 'also a header without `URL` and with `messageHTML === true`'
      }
   ].forEach(nextTestSet => it(nextTestSet.title, () => {
      var settings = JSON.parse(fs.readFileSync(
         path.join(__dirname, nextTestSet.source), { encoding: 'utf8' }
      ));
      var expectedResult = fs.readFileSync(
         path.join(__dirname, nextTestSet.result), { encoding: 'utf8' }
      ).replace(/\r/g, ''); // CRLF → LF
      assert.strictEqual( syncEFGH(settings), expectedResult );
   }))
);