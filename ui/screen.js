var blessed = require("blessed");
var _       = require("lodash");

var screen = blessed.screen({
    smartCSR: true,

    cursor: {
        blink: true
    },

    style: {
        fg: "white",
        bg: "blue"
    },

    dockBorders: true,

    title: "JiRAmon"
});

// Bind shortcut to terminate program
screen.key(["C-c", "C-q"], process.exit.bind(this, 0));

module.exports = screen;
