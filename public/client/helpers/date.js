
Template.registerHelper('formatDate', function(date) {
    return moment(date).format('DD.MM.YYYY');
});

Template.registerHelper('formatTime', function(date) {
    return moment(date).format('H:m:s');
});

Template.registerHelper('formatDateTime', function(date) {
    return moment(date).format('DD.MM.YYYY H:m');
});

Template.registerHelper('freeDateFormat', function(date, formatString) {
    return moment(date).format(formatString);
});