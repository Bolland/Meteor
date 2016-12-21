
Meteor.startup(function () {

    Meteor.subscribe('projects');
    Meteor.subscribe('employees');
    Meteor.subscribe("userData");
    Meteor.subscribe("roles");
    Meteor.subscribe("departments");

    Session.set('search_result_ids', null);


    Meteor.methods({

    });

});

