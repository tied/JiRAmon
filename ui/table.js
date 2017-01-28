var blessed = require("blessed");
var _       = require("lodash");

var screen = require("./screen");

var table = blessed.listtable({
    width:  "100%",
    height: "100%-1",

    bottom: 0,

    keys:  true,
    tags:  true,
    mouse: true,

    scrollbar:     true,
    noCellBorders: true,

    style: {
        fg:        "white",
        bg:        "blue",
        border:    {
            fg: "white",
            bg: "blue"
        },
        header:    {
            fg: "cyan",
            bg: "blue"
        },
        cell:      {
            selected: {
                fg: "black",
                bg: "cyan"
            }
        },
        scrollbar: {
            bg: 'red',
            fg: 'red'
        }
    },

    border: "line",
    align:  "left"
});

table.setTableData = function (data)
{
    table.setData(data);
    table.data = data;
};

table.key(["pageup"], function ()
{
    table.up(10);
    screen.render();
});

table.key(["pagedown"], function ()
{
    table.down(10);
    screen.render();
});

table.key(["home"], function ()
{
    table.scrollTo(0);
    table.select(0);
    screen.render();
});


table.key(["end"], function ()
{
    table.scrollTo(table.data.length);
    table.select(table.data.length);
    screen.render();
});

table.on("select", function ()
{
    if (_.isFunction(table.onSelect)) {
        table.onSelect(table.selected - 1);
    }
});

module.exports = table;
