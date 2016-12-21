
AdminController = BaseController.extend({

    layoutTemplate: 'layout_admin',

    index: function () {
        this.render('admin_index');
    },

    onBeforeAction: function () {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            Router.go('/');
        } else {
            this.next();
        }
    }

});