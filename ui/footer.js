var blessed = require("blessed");
var chalk   = require("chalk");
var _       = require("lodash");

var title = " [F1:Help] ";

var footer = blessed.box({
    width:  title.length,
    height: 1,

    right: 2,
    bottom: 0,

    content: chalk.bgBlue(title)
});

module.exports = footer;
