var _       = require("lodash");
var request = require("request");
var open    = require("open");
var url     = require('url');


var screen  = require("../ui/screen");
var table   = require("../ui/table");
var spinner = require("../ui/spinner");
var helper  = require("../ui/helper");
var Issue   = require("./Issue");

var connector = {};

connector.loadIssues = function (jiraRestUrl)
{
    jiraRestUrl = "https://jira.atlassian.com/rest/api/2/search?jql=project=%22JRA%22";
    var urlConf = url.parse(jiraRestUrl);

    var header  = ["ID", "Status", "Priority", "Type", "Summary", "Reporter"];
    var rowData = [header];

    getIssuesFromURL(jiraRestUrl, function (res)
    {
        _.forEach(res.issues, function (issue)
        {
            var issue = new Issue(issue);
            rowData.push([
                issue.getKey(),
                issue.getStatus(),
                issue.getPriority(),
                issue.getIssueType(),
                issue.getSummary(),
                issue.getReporter()
            ]);
        });

        helper.notify("Fetched %d issues from %s.", res.issues.length, urlConf.hostname);

        table.onSelect = function (idx)
        {
            var issue = res.issues[idx];
            open(urlConf.protocol + "//" + urlConf.host + "/browse/" + issue.key);
        };

        table.setTableData(rowData);
        screen.render();
    });
};

function getIssuesFromURL (url, callback)
{
    spinner.show();
    request(url, function (error, response, body)
    {
        spinner.hide();
        if (error || response.statusCode !== 200) {
            return;
        }

        callback(JSON.parse(body));
    });
}

module.exports = connector;