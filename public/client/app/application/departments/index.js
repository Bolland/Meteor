
Template.index_index.rendered = function() {
    // @todo shit does not work for new stuff added on the fly
    $('[data-toggle="tooltip"]').tooltip({html: true});
};


Template.employeeList.helpers({

    employees: function() {
        var result = [];
        var users =  Meteor.users.find({}, {sort: {'profile.department': 1}});
        users.forEach( function(user) {
            if (!(user.profile.department in result)) {
                result[user.profile.department] = [];
            }
            result[user.profile.department].push(user);
        });

        console.log(result);

        return result;
    }

});
