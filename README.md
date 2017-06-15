[![(a histogram of downloads)](https://nodei.co/npm-dl/efgh.png?height=3)](https://npmjs.org/package/efgh)

## Echomail of Fidonet: generator of headers

This module (`efgh`) is a generator of HTML5 representations of headers for Fidonet echomail messages.

This module is written in JavaScript and requires [Node.js](http://nodejs.org/) to run. It uses some ECMAScript 2015 features, and thus a relatively recent Node.js is required. The module is tested against Node.js v4, Node.js v5, Node.js v6, Node.js v7, and the latest stable Node.js version.

## Installing EFGH

[![(npm package version)](https://nodei.co/npm/efgh.png?downloads=true&downloadRank=true)](https://npmjs.org/package/efgh)

* Latest packaged version: `npm install efgh`

* Latest githubbed version: `npm install https://github.com/Mithgol/efgh/tarball/master`

The npm package does not contain the tests, they're published on GitHub only.

You may visit https://github.com/Mithgol/efgh#readme occasionally to read the latest `README` because the package's version is not planned to grow after changes when they happen in `README` only. (And `npm publish --force` is [forbidden](http://blog.npmjs.org/post/77758351673/no-more-npm-publish-f) nowadays.)

## Using EFGH

When you `require()` the installed module, an object is returned.

That object's `sync` property represents the synchronous interface. An asynchronous interface is planned, but not (yet) implemented.

### The synchronous interface

When you `require()` the installed module, an object is returned. Its `sync` property represents the synchronous interface.

That property is a function that accepts an object of settings and returns (synchronously) the corresponding HTML5 representation of a header for a Fidonet echomail message.

That header is returned as a JavaScript string.

An object of settings has the following fields:

* ![(TODO: not ready)](https://img.shields.io/badge/TODO-%28not_ready%29-001f3f.svg?style=plastic) `nodelist` — by default, `false`. It may also contain an object constructed by the constructor returned from the [Fidonet nodelist](https://github.com/Mithgol/node-fidonet-nodelist) module. In the latter case, the Fidonet nodelist is used to determine the physical location (town, suburb, city, etc.) of the message's sender (using the Fidonet address); that location is displayed in the header.

* `avatarWidth` — width (in CSS pixels) of an avatar of the message's author (or of a default avatar). By default, `140`. This value does not have to be equal to the avatar's width in physical pixels (for example, where `window.devicePixelRatio != 1` in your client-side code).

* `avatarURL` — URL of the avatar (i.e. of the picture).

* `from` — the sender's name.

* `origAddr` — the sender's address.

* `to` — the recipient's name.

* `origTime` — the time when the message was written. Either a string or an array of year, month, day, hour, minute, second.

* `procTime` — the time when the message was processed by an echoprocessor. Either a string or an array of year, month, day, hour, minute, second.
   * This setting is optional. You may decide to pass an `undefined` value if you prefer the headers of the same Fidonet message to be exactly the same on different Fidonet systems (i.e. to not depend on the processing's time). For example, it helps to prevent redundant copies of the message in a global content-addressable storage (such as [IPFS](https://ipfs.io/)).

* `subj` — the message's subject line.

* `URL` — [FGHI URL](https://github.com/Mithgol/FGHI-URL/) of the message.

* `messageHTML` — by default, `false`. It means that the HTML5 `table` is closed by its closing tag (`</table>`).
   * If `messageHTML === true`, the header (HTML5 `<table>`) is not completed and thus the returned string ends with open `tr` and `td` elements; the message's main text (in HTML) can be added after those elements and ended with `</td></tr></table>` to end the table. The `td` element is given the class `messageText`.
   * Also `messageHTML` can be a JavaScript string containing the message's main text (in HTML). In such case the string returned from `.sync()` contains the whole message (not only the header as an HTML table, but also the main text in the last row of the same HTML table).

## CSS rules

Three [Bootstrap](http://getbootstrap.com/) classes ('table', 'table-bordered', 'table-condensed') are assigned to the header's table.

Two additional classes are used for EFGH purposes:

* `inverse` — this class is assigned to individual headers (`From`, `To`, `Subj`, `FGHI URL`) and provides an inverted look (white text on dark background)

* `avatar` — this class is assigned to the `TH` element of the avatar (user's picture) and ensures its proper display (for example, `background-size: contain`).

CSS rules for these two EFGH classes are provided in the file `styles/efgh.css`. Users of EFGH are expected to reference that file or include it in their CSS.

* To facilitate such references, `require('efgh').pathCSS()` returns `path.join(__dirname, 'styles', 'efgh.css')` (in other words, the full path to the `efgh.css` file).

HTML5 headers generated by EFGH may not be displayed properly if HTML5 representation is provided without the corresponding CSS rules (for example, in `description` elements of RSS items).

## Testing EFGH

[![(build testing status)](https://img.shields.io/travis/Mithgol/efgh/master.svg?style=plastic)](https://travis-ci.org/Mithgol/efgh)

It is necessary to install [Mocha](https://mochajs.org/) and [JSHint](http://jshint.com/) for testing.

* You may install Mocha globally (`npm install mocha -g`) or locally (`npm install mocha` in the directory of EFGH).

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of EFGH).

After that you may run `npm test` (in the directory of EFGH).

## License

MIT license (see the `LICENSE` file).