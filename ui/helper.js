var notifier = require('node-notifier');
var printf   = require('printf');

var helper = {};

helper.notify = function ()
{git
    var title   = "JiRAmon";
    var message = printf.apply(null, arguments);

    return notifier.notify({
        title:   title,
        message: message,
        wait:    true
    });
};

module.exports = helper;