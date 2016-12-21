
Template.index_index.rendered = function() {
    // @todo shit does not work for new stuff added on the fly
    $('[data-toggle="tooltip"]').tooltip({html: true});
};


Template.project.helpers({

    projects: function() {
        return Projects.find();
    },

    getEmployees: function() {
        var result = [];
        _.values(this.employees).forEach( function(employeeObject) {
            result.push({dateAdded: employeeObject.dateAdded, employee: Meteor.users.findOne(employeeObject.employeeId)});
        });
        /* $in selector mongo
        var ids = this.employees.map( function ( em ) return em.employeeId );

        Meteor.find()

        return this.employees.map( function ( em ) {
            return
        })
        */

        return result;
    },

    // @todo shitty unperformant code!
    isCurrentUserInProject: function() {
        var currentUser = Meteor.user();
        var bool = false;
        _.values(this.employees).forEach( function(employeeObject) {
            if (employeeObject.employeeId === currentUser._id) {
                bool = true;
                return;
            }
        });
        return bool;
    },

    isLoggedInUser: function() {
        return !(Meteor.user() === null);
    }

});


Template.projectCoach.helpers({

    projectCoach: function() {
        return Meteor.users.findOne(this.projectCoachId);
    },

    getSearchResultMark: function(isInSearchValue, isNotInSearchValue) {
        var coach = Meteor.users.findOne(this.projectCoachId);
        if (!coach) {
            return isNotInSearchValue;
        }
        return (Session.get('search_employee_id') === coach._id) || (Session.get('search_department_name') === coach.profile.department) ? isInSearchValue : isNotInSearchValue;
    }
});


Template.employee.helpers({

    getEmployeeImagePath: function() {
        if (!this.employee || !this.employee.profile.thumbnail) {
            return '/images/employees/user-placeholder.png';
        } else {
            return '/images/employees/thumbs/' + this.employee.profile.thumbnail;
        }
    },

    getSearchResultMark: function(isInSearchValue, isNotInSearchValue) {
        if (!this.employee) {
            return isNotInSearchValue;
        }
        return ((Session.get('search_employee_id') === this.employee._id) || (Session.get('search_department_name') === this.employee.profile.department)) ? isInSearchValue : isNotInSearchValue;
    },

    getCurrentUserMark: function(isCurrentUserMark, isNotCurrentUserMark) {
        if (Meteor.user() === null) {
            return isNotCurrentUserMark;
        }
        if (!this.employee) {
            return isNotCurrentUserMark;
        }
        return (this.employee._id === Meteor.user()._id ? isCurrentUserMark : isNotCurrentUserMark);
    }

});

Template.unassignedEmployees.helpers({

    getUnassignedEmployees: function() {

        var assignedEmployeeIds = [];
        Projects.find().forEach( function(project) {
            _.values(project.employees).forEach( function(employeeObject) {
                if (assignedEmployeeIds.indexOf(employeeObject.employeeId) === -1) {
                    assignedEmployeeIds.push(employeeObject.employeeId);
                }
            });
        });
        return Meteor.users.find({_id: { $nin: assignedEmployeeIds}});
    }

});

Template.unassignedEmployee.helpers({

    getEmployeeImagePath: function() {
        if (!this || !this.profile.thumbnail) {
            return '/images/employees/user-placeholder.png';
        } else {
            return '/images/employees/thumbs/' + this.profile.thumbnail;
        }
    },

    getSearchResultMark: function(isInSearchValue, isNotInSearchValue) {
        if (!this) {
            return isNotInSearchValue;
        }
        return ((Session.get('search_employee_id') === this._id) || (Session.get('search_department_name') === this.profile.department)) ? isInSearchValue : isNotInSearchValue;
    }

});


Template.addAction.events({

    'click .action-add': function (event, template) {
        event.preventDefault();
        var currentUser = Meteor.user();
        Meteor.call('addUserToProject', this._id, currentUser._id , function(error, response) {});
    }

});


Template.removeAction.events({

    'click .action-remove': function (event, template) {
        event.preventDefault();
        var currentUser = Meteor.user();
        Meteor.call('removeUserFromProject', this._id, currentUser._id , function(error, response) {});
    }

});