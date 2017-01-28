var _     = require("lodash");
var chalk = require("chalk");

var Issue = function (context)
{
    this.context = context;
    return this;
};

Issue.prototype.getReporter = function ()
{
    return this.context.fields.reporter.displayName;
};

Issue.prototype.getIssueType = function ()
{
    var issueType = this.context.fields.issuetype.name;

    var prefix = "";

    switch (issueType.toUpperCase()) {
        case "BUG":
            prefix = chalk.red("⊙ ");
            break;
        case "SUGGESTION":
            prefix = chalk.yellow("⊛ ");
            break;
        case "MEDIUM":
            prefix = chalk.yellow("\u2191");
            break;
        case "LOW":
            prefix = chalk.green("\u2193");
            break;
        case "LOWEST":
            prefix = chalk.green("\u2193");
            break;
    }

    return prefix + issueType.toUpperCase();
};

Issue.prototype.getSummary = function ()
{
    var summary = _.truncate(this.context.fields.summary, {
        length:    100,
        separator: " "
    });

    return summary;
};

Issue.prototype.getKey = function ()
{
    return this.context.key;
};

Issue.prototype.getStatus = function ()
{
    var status = this.context.fields.status.name;
    return chalk[getStatusColor(status)](status.toUpperCase());
};

Issue.prototype.getPriority = function ()
{
    var priority = _.has(this.context, "fields.priority.name") ? this.context.fields.priority.name : "";

    var prefix = "";

    switch (priority.toUpperCase()) {
        case "HIGHEST":
            prefix = chalk.red("\u2191");
            break;
        case "HIGH":
            prefix = chalk.red("\u2191");
            break;
        case "MEDIUM":
            prefix = chalk.yellow("\u2191");
            break;
        case "LOW":
            prefix = chalk.green("\u2193");
            break;
        case "LOWEST":
            prefix = chalk.green("\u2193");
            break;
    }

    return prefix + priority.toUpperCase();
};

////////////

function getStatusColor (status)
{
    switch (status.toUpperCase()) {
        case "OPEN":
            return "magenta";

        case "VERIFIED":
            return "green";

        case "IN PROGRESS":
            return "yellow";

        case "RESOLVED":
        case "CLOSED":
            return "gray";
    }

    return "stripColor";
}

module.exports = Issue;

