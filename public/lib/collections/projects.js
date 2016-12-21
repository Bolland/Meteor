ProjectsSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 50
    },
    image: {
        type: String,
        label: "Image",
        max: 200,
        optional: true
    },
    projectCoachId: {
        type: String,
        max: 50
    },

    // @todo create Schema for employee data

    employees: {
        type: [Object]
    },
    "employees.$.employeeId": {
        type: String,
        max: 50
    },
    "employees.$.dateAdded": {
        type: Date
    }
});
Projects = new Mongo.Collection('projects');
Projects.attachSchema(ProjectsSchema);
Projects.allow({
    insert: function ( userId, doc ) {
        return false;
    },
    update: function ( userId, doc, fields, modifier ) {
        return false;
    },
    remove: function ( userId, doc ) {
        return false;
    },
    fetch: ['userId']
});
