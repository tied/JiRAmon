var screen = require("../ui/screen");

var blessed = require("blessed");
var chalk   = require("chalk");

var anim = ["|", "/", "-", "\\"];
var tick, interval;

var spinner = blessed.box({
    width:  "40%",
    height: 3,

    top:  "50%-2",
    left: "30%",

    style: {
        fg:     "black",
        bg:     "white",
        border: {
            fg: "black",
            bg: "white"
        },
        shadow: true
    },

    border: "line",
    align:  "center",

    hidden: true
});

spinner.show = function (text)
{
    text = text || "Loading...";
    tick = tick || 0;

    spinner.hidden = false;

    interval = setInterval(function ()
    {
        spinner.content = "[" + chalk.bgWhite(chalk.red(anim[tick++]) + "] " + text);
        screen.render();

        if (tick >= anim.length) {
            tick = 0;
        }
    }, 50);
};

spinner.hide = function ()
{
    clearInterval(interval);
    spinner.hidden = true;
};

module.exports = spinner;
