/* global describe, it */
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var EFGH = require('../');
var syncEFGH = EFGH.sync;

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
      },
      {
         source: 'msgMatrix.json',
         result: 'msgMatrix.html',
         title: "FGHI URL and message's content are also included",
         URL: 'area://Ru.Blog.Mithgol?msgid=2:50/88+5731ecd5',
         message: 'msgMatrix.txt'
      },
      {
         source: 'msgMatrixIndependent.json',
         result: 'msgMatrixIndependent.html',
         title: "header doesn't depend on the system if `procTime` isn't set",
         URL: 'area://Ru.Blog.Mithgol?msgid=2:50/88+5731ecd5',
         message: 'msgMatrix.txt'
      }
   ].forEach(nextTestSet => it(nextTestSet.title, () => {
      var settings = JSON.parse(fs.readFileSync(
         path.join(__dirname, nextTestSet.source), { encoding: 'utf8' }
      ));
      if( nextTestSet.URL ) settings.URL = nextTestSet.URL;
      if( nextTestSet.message ) settings.messageHTML = fs.readFileSync(
         path.join(__dirname, nextTestSet.message), { encoding: 'utf8' }
      ).replace(/\r/g, ''); // CRLF → LF
      var expectedResult = fs.readFileSync(
         path.join(__dirname, nextTestSet.result), { encoding: 'utf8' }
      ).replace(/\r/g, ''); // CRLF → LF
      assert.strictEqual( syncEFGH(settings), expectedResult );
   }))
);

describe('CSS path interface', () => {
   it('the returned path ends with `efgh.css`', () => assert.ok(
      EFGH.pathCSS().endsWith('efgh.css')
   ));
});