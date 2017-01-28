var blessed = require("blessed");
var chalk   = require("chalk");
var _       = require("lodash");

var title = " \u265C JiRAmon ";

var menu = blessed.box({
    width:  "100%",
    height: 1,

    style: {
        fg: "cyan",
        bg: "blue"
    },

    content: chalk.bgBlue.bold(title)
});

module.exports = menu;
