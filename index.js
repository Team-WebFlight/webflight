'use strict'

const stringifyHtml = require('./lib/stringifyHtml')
const makeFilesObj = require('./lib/makeFilesObj')
const hashFilesObj = require('./lib/hashFilesObj')
const writeJs = require('./lib/writeJs')
const replaceHtml = require('./lib/replaceHtml')
const writeNewHtml = require('./lib/writeNewHtml')

// options :: Object
  // originalHtml: .html file to be rebuilt
  // filesFolder: folder with files to be torrented
  // route: path on the server for files
  // jsOutput: location and name for webflight.js file
  // htmlOutput: location and name for rebuilt html file
function WebFlight(options) {
  return new Promise((resolve, reject) => {
    const originalHtmlString = stringifyHtml(options.originalHtml)
    const filesObj = makeFilesObj(options.filesFolder, options.route)
    
    hashFilesObj(filesObj)
      .then(writeJs.bind(null, options.jsOutput))
      .then(replaceHtml.bind(null, originalHtmlString))
      .then(writeNewHtml.bind(null, options.htmlOutput))
      .then(resolve)
  })
}

module.exports = WebFlight