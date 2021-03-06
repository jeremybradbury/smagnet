'use strict';
const { logConfig } = require('../config');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const access = require('morgan');
const winston = require('winston');

fs.existsSync(logConfig.dir) || fs.mkdirSync(logConfig.dir);

const aStream = rfs(logConfig.dir+'/'+logConfig.access.fn, logConfig.access.options);
const eOpts = Object.assign({}, logConfig.eLogOptions, {filename: logConfig.dir + "/" + logConfig.error.fn});
const e = new winston.Logger({
  transports: [
    new winston.transports.File(eOpts),
    new winston.transports.Console(logConfig.error.options.console)
  ],
  exitOnError: false
});
const eStream = {
  write: function(message, encoding) {
    e.info(message);
  }
}

module.exports = {
  access,
  aStream,
  e,
  eStream
};