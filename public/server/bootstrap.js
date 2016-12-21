
Meteor.startup(function () {

    //Projects.remove({});
    //Employees.remove({});

    //Meteor.users.update({_id:userId}, {$set: {'emails.0.verified': true}});


    /**
     * Create Default Roles
     */
    if (Roles.getAllRoles().count() < 1) {
        var roles = [
            {name: 'admin'}, {name: 'staff'}
        ];
        _.each(roles, function(roleData) {
            Roles.createRole(roleData.name);
        });
    }

    /**
     * Create Default Users
     */
    if (Meteor.users.find().count() < 1) {
        var users = [
            {lastname: 'Admin', email: 'admin@project-a.com', password: 'admin', roles: ['admin']},
            {lastname: 'Test', email: 'test@project-a.com', password: 'test', roles: ['staff']}
        ];
        _.each(users, function(userData){
            var userId = Accounts.createUser({
                email: userData.email,
                password: userData.password,
                username: userData.name,
                profile: {
                    firstname: '',
                    lastname: userData.lastname,
                    department: 'no',
                    image: 'image-admin',
                    thumbnail: 'thumbnail-admin'
                }
            });
            Meteor.users.update({_id:userId}, {$set: {'emails.0.verified': true}});
            Roles.addUsersToRoles(userId, userData.roles);
        });
    }


    // http://joshowens.me/the-curious-case-of-the-unknowing-leaky-meteor-security/
    Meteor.users.deny({
        update: function() {
            return false;
        }
    });


});