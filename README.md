[![(a histogram of downloads)](https://nodei.co/npm-dl/efgh.png?height=3)](https://npmjs.org/package/efgh)

## Echomail of Fidonet: generator of headers

This module (`efgh`) is a generator of HTML5 representations of headers for Fidonet echomail messages.

This module is written in JavaScript and requires [Node.js](http://nodejs.org/) to run. It uses some ECMAScript 2015 features, and thus a relatively recent Node.js is required. The module is tested against Node.js v4.x and the latest stable Node.js version.

This module is currently in an early phase of its development and thus does not have the desired level of feature completeness.

## Installing EFGH

[![(npm package version)](https://nodei.co/npm/efgh.png?downloads=true&downloadRank=true)](https://npmjs.org/package/efgh)

* Latest packaged version: `npm install efgh`

* Latest githubbed version: `npm install https://github.com/Mithgol/efgh/tarball/master`

You may visit https://github.com/Mithgol/efgh#readme occasionally to read the latest `README` because the package's version is not planned to grow after changes when they happen in `README` only. (And `npm publish --force` is [forbidden](http://blog.npmjs.org/post/77758351673/no-more-npm-publish-f) nowadays.)

## Using EFGH

When you `require()` the installed module, an object is returned.

That object's `sync` property represents the synchronous interface. An asynchronous interface is planned, but not (yet) implemented.

### The synchronous interface

When you `require()` the installed module, an object is returned. Its `sync` property represents the synchronous interface.

That property is a function that accepts an object of settings and returns (synchronously) the corresponding HTML5 representation of a header for a Fidonet echomail message.

[Bootstrap](http://getbootstrap.com/) classes are assigned to the header's elements.

The header is returned as a JavaScript string.

An object of settings has the following fields:

* `navigation` — by default, `false`. It means that the header won't have elements providing navigation between individual Fidonet echomail messages. If this default value is changed, `navigation` is expected to be an object with the following optional properties:
   * `number` — the current message's number, 1-based. If this property is omitted, `total` is not displayed as well.
   * `total` — the last message's number, 1-based.
   * `first` — the first message's URL, to be used in the code of the corresponding navigational button. If this property is omitted, the button is grayed out. If all such buttons are to be grayed out, they are not displayed at all.
   * `prev` — the previous message's URL, to be used in the code of the corresponding navigational button. If this property is omitted, the button is grayed out. If all such buttons are to be grayed out, they are not displayed at all.
   * `next` — the next message's URL, to be used in the code of the corresponding navigational button. If this property is omitted, the button is grayed out. If all such buttons are to be grayed out, they are not displayed at all.
   * `last` — the last message's URL, to be used in the code of the corresponding navigational button. If this property is omitted, the button is grayed out. If all such buttons are to be grayed out, they are not displayed at all.
   * `parent.num` and `parent.URL` — the number and the URL of the parent message, to which the current message is a reply.
   * `replies` — an array of replies to the current message. (Each element of that array is expected to be an object with the properties `.num` and `.URL` for the number and the URL of the reply.)

* `nodelist` — by default, `false`. It may also contain an object constructed by the constructor returned from the [Fidonet nodelist](https://github.com/Mithgol/node-fidonet-nodelist) module. In the latter case, the Fidonet nodelist is used to determine the physical location (town, suburb, city, etc.) of the message's sender (using the Fidonet address); that location is displayed in the header.

* `avatarWidth` — width (in CSS pixels) of an avatar of the message's author (or of a default avatar). By default, `140`. This value does not have to be equal to the avatar's width in physical pixels (for example, where `window.devicePixelRatio != 1` in your client-side code).

* `avatarURL` — URL of the avatar (i.e. of the picture).

* `from` — the sender's name.

* `origAddr` — the sender's address.

* `origTime` — the time when the message was written. Either a string or an array of year, month, day, hour, minute, second.

* `procTime` — the time when the message was processed by an echoprocessor. Either a string or an array of year, month, day, hour, minute, second.

* `subj` — the message's subject line.

* `URL` — [FGHI URL](https://github.com/Mithgol/FGHI-URL/) of the message.

* `messageHTML` — by default, `false`.
   * If `messageHTML === true`, the header (HTML5 `<table>`) is not completed and thus the returned string ends with open `tr` and `td` elements; the message's main text (in HTML) can be added after those elements and ended with `</td></tr></table>` to end the table.
   * Also `messageHTML` can be a JavaScript string containing the message's main text (in HTML). In such case the returned string contains the whole message (not only the header as an HTML table, but also the main text in the last row of the same HTML table).

## Testing EFGH

[![(build testing status)](https://img.shields.io/travis/Mithgol/efgh/master.svg?style=plastic)](https://travis-ci.org/Mithgol/efgh)

It is necessary to install [JSHint](http://jshint.com/) for testing.

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of EFGH).

After that you may run `npm test` (in the directory of EFGH). Only the JS code errors are caught; the code's behaviour is not tested.

## License

MIT license (see the `LICENSE` file).