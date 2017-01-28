var screen    = require("./ui/screen");
var menu      = require("./ui/menu");
var table     = require("./ui/table");
var spinner   = require("./ui/spinner");
var connector = require("./core/connector");

connector.loadIssues();
table.focus();

screen.append(menu);
screen.append(table);
screen.append(spinner);

screen.render();
