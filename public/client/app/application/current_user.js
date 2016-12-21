
Template.currentUser.helpers({
    'currentUser': function () {
        return Meteor.user();
    }
});