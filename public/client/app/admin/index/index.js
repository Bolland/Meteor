
Template.projectsAdmin.events({
    'click button': function () {
        Projects.remove(2);
    }
});

Template.projectsAdmin.helpers({
    projects: function() {
        return Projects.find();
    },
    getImageUrl : function () {
        if (!this.image) {
            return '/images/projects/project-placeholder.png';
        } else {
            return '/images/projects/' + this.image;
        }
    }
});

Template.addProjectForm.events({
    'submit form': function(event){
        event.preventDefault();
        Meteor.call('createProject', event.target.projectName.value, event.target.projectCoach.value , function(error, response) {
            if(!error) {
                FlashMessages.sendSuccess("Successfully created project.");
            } else {
                FlashMessages.sendError("Not able to create project. " + error);
            }
        });

    }
});


// EMPLOYEES ----------------------------------------------------


Template.coachPicker.helpers({
    coaches: function() {
        return Meteor.users.find({'profile.isProjectCoach': true});
    }
});

Template.projectPicker.helpers({
    projects: function() {
        return Projects.find();
    }
});

Template.aclRoles.helpers({
    roles: function() {
        return Roles.getAllRoles();
    }
});

Template.employeePicker.helpers({
    employees: function() {
        return Meteor.users.find({});
    }
});

Template.signedUpUsers.helpers({
    users: function() {
        return Meteor.users.find();
    },
    getFirstEmailAddress: function() {
        return this.emails[0].address;
    },
    getName: function() {
        return this.profile.firstname + ' ' + this.profile.lastname;
    },
    isCoach: function() {
        return this.profile.isProjectCoach;
    },
    getImagePath: function() {
        if (!this.profile.thumbnail) {
            return '/images/employees/user-placeholder.png';
        } else {
            return '/images/employees/thumbs/' + this.profile.thumbnail;
        }
    }
});


Template.synchronizeUsers.events({
    'click button': function(event, template){
        event.preventDefault();
        Meteor.call('synchronizeUsers', function(error, response) {
            if(!error) {
                FlashMessages.sendSuccess("Successfully synchronized users.");
            } else {
                FlashMessages.sendError("Error on Synchronizing userss. " + error);
            }
        });
    }
});


Template.connectForm.events({
    'submit form': function(event){
        event.preventDefault();
        Meteor.call('addUserToProject', event.target.projectId.value, event.target.employeeId.value , function(error, response) {
            if(!error) {
                FlashMessages.sendSuccess("Successfully added employee to project.");
            } else {
                FlashMessages.sendError("Not able to add employee to project. " + error);
            }
        });
    }
});