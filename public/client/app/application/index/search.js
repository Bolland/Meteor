/* Full text search
Template.search.events({
    'submit form': function(event){
        event.preventDefault();
        clearSearchResults();
        var searchTerm = event.target.search.value;
        var employee = Meteor.users.findOne({ name: searchTerm });

        if (!employee) {
            FlashMessages.sendWarning("Nothing found for: " + searchTerm);
            return;
        }
        markSearchResults(employee._id);
    }
});
*/

Template.searchEmployeePicker.helpers({

    employees: function() {
        return Meteor.users.find({}, {sort: {'profile.lastname': 1}});
    },

    markCoach: function() {
        return this.profile.isProjectCoach ? '[V-COACH]' : '';
    }

});

Template.searchEmployeePicker.events({

    'change #searchEmployeePicker': function(event){
        event.preventDefault();
        Session.set('search_employee_id', $(event.target).val());
    }

});

Template.searchDepartmentPicker.helpers({

    departments: function() {
        return Departments.find({}, {sort: {'name': 1}});
    }

});

Template.searchDepartmentPicker.events({

    'change #searchDepartmentPicker': function(event){
        event.preventDefault();
        Session.set('search_department_name', $(event.target).val());
    }

});

/*
Template.search.events({
    'submit form': function(event){
        event.preventDefault();
        clearSearchResults();
        var searchTerm = event.target.search.value;
        var employee = Meteor.users.find({});

        if (!employee) {
            FlashMessages.sendWarning("Nothing found for: " + searchTerm);
            return;
        }
        markSearchResults(employee._id);
    }
});
*/


