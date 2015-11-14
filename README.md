[![(a histogram of downloads)](https://nodei.co/npm-dl/efgh.png?height=3)](https://npmjs.org/package/efgh)

## Echomail in Fidonet: generator of headers.

This module (`efgh`) is a generator of HTML5 representations of headers for Fidonet echomail messages.

This module is written in JavaScript and requires [Node.js](http://nodejs.org/) to run.

This module is currently in an early phase of its development and thus does not have the desired level of feature completeness.

## Installing EFGH

[![(npm package version)](https://nodei.co/npm/efgh.png?downloads=true&downloadRank=true)](https://npmjs.org/package/efgh)

* Latest packaged version: `npm install efgh`

* Latest githubbed version: `npm install https://github.com/Mithgol/efgh/tarball/master`

You may visit https://github.com/Mithgol/efgh#readme occasionally to read the latest `README` because the package's version is not planned to grow after changes when they happen in `README` only. (And `npm publish --force` is [forbidden](http://blog.npmjs.org/post/77758351673/no-more-npm-publish-f) nowadays.)

## Testing EFGH

It is necessary to install [JSHint](http://jshint.com/) for testing.

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of EFGH).

After that you may run `npm test` (in the directory of EFGH). Only the JS code errors are caught; the code's behaviour is not tested.

## License

MIT license (see the `LICENSE` file).