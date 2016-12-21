
Template.navigation.events({

    'click #linkHome': function () {
        Router.go('/');
    },

    'click #linkDepartments': function () {
        Router.go('/departments');
    },

    'click #linkWallOfFame': function () {
        Router.go('/wall-of-fame');
    },

    'click #linkAdmin': function () {
        Router.go('/admin');
    }

});
