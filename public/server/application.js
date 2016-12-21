

Meteor.publish("roles", function (){
    return Meteor.roles.find({}, {})
});

Meteor.publish("userData", function () {
    return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});

Meteor.publish("projects", function () {
    return Projects.find({}, {});
});

Meteor.publish("departments", function () {
    return Departments.find({}, {});
});


Meteor.startup(function () {

    Meteor.methods({

        addUserToProject: function (projectId, currentUserId) {
            var data = {employeeId: currentUserId, dateAdded: new Date()};
            Projects.update({_id: projectId}, {$push: {employees: data}});
        },

        /**
         * @todo shitti WORKARROUND
         * Projects.update({_id: this._id}, {$set: {'employees.$.employeeId': currentUser._id}});
         * does not work...
         */
        removeUserFromProject: function (projectId, currentUserId) {
            var project = Projects.findOne(projectId);
            var userObjectArray = _.values(project.employees);

            var index = null;
            for (var i = 0; i < userObjectArray.length; i++) {
                if (userObjectArray[i].employeeId === currentUserId) {
                    index = i;
                    break;
                }
            }
            if (index !== null) {
                userObjectArray.splice(index, 1);
            }

            Projects.update({_id: projectId}, {$set: {employees: userObjectArray}});
        },

        createProject: function (projectName, coachId) {

            var coach = Meteor.users.findOne(coachId);
            //if !(coach.isCoach)

            Projects.insert({
                name: projectName,
                employees: [],
                projectCoachId: coachId
            }, { validationContext: "add-project-form" }, function(error, result) {
                if(!result || result === 'undefined') {
                    FlashMessages.sendError("Not able to add project '" + projectName + "'! " + error);
                } else {
                    FlashMessages.sendSuccess("Successfully added project '" + projectName + "'.");
                }
            });
        },

        synchronizeUsers: function () {
            this.unblock();
            try {
                var userJsonVar = HTTP.get("https://intranet.project-a.com/wp-includes/js/ateam.php", {
                    params: {},
                    auth: 'XXXX-USER:XXXX-PASS' //intranet...
                });

                var ventureCoaches = ['florian.heinemann@project-a.com','christian.weiss@project-a.com','uwe.horstmann@project-a.com','thies.sander@project-a.com','mark.hartmann@project-a.com'];

                userJsonVar = userJsonVar.content.replace("var aTeam = {", "");
                userJsonVar = userJsonVar.replace("}]}]};", "}]}]");
                userJsonVar = userJsonVar.replace(/(\r\n|\n|\r)/gm,"");
                userJsonVar = userJsonVar.replace("    member:","");
                var objJSON = eval("(function(){return " + userJsonVar + ";})()");

                for(var i = 0; i < objJSON.length; i++) {

                    var firstName = ucfirst(objJSON[i].firstname);
                    var lastName = ucfirst(objJSON[i].lastname);
                    var email = objJSON[i].email;
                    var department = ucfirst(objJSON[i].department);
                    var department = department === "" ? "Not Available" : department;
                    var image = objJSON[i].image;
                    var thumbnail = objJSON[i].thumbnail;

                    var existingUser = Meteor.users.find({ "emails.address" : email }).fetch();

                    if (existingUser.length == 0) {
                        console.log('ADDING: email:' + email + ' name:' + firstName + ' ' + lastName);
                        var userId = Accounts.createUser({
                            email: email,
                            password: 'test',
                            username: firstName + ' ' + lastName,
                            profile: {
                                firstname: firstName,
                                lastname: lastName,
                                department: department,
                                image: image,
                                thumbnail: thumbnail,
                                isProjectCoach: false
                            }
                        });
                        Meteor.users.update({_id:userId}, {$set: {'emails.0.verified': true}});
                        Roles.addUsersToRoles(userId, ['staff']);
                    } else {
                        console.log('UPDATING: ' + existingUser[0]._id + ' '  + firstName + ' ' + lastName);
                        Meteor.users.update({_id:existingUser[0]._id},
                            {$set:{
                                'username':
                                firstName + ' ' + lastName,
                                'profile': {
                                    firstname: firstName,
                                    lastname: lastName,
                                    department: department,
                                    image: image,
                                    thumbnail: thumbnail,
                                    isProjectCoach: existingUser.profile.isProjectCoach
                                }
                            }
                            });
                    }

                    var existingDepartment = Departments.findOne({name: department});
                    if (!existingDepartment) {
                        console.log('ADD department: ' + department);
                        Departments.insert({name: department});
                    }

                }

                return true
            } catch (e) {
                console.log(e);
                // Got a network error, time-out or HTTP error in the 400 or 500 range.
                return false;
            }
        }




});

});

function ucfirst(string) {
    string += '';
    var first = string.charAt(0).toUpperCase();

    return first + string.substr(1);
}