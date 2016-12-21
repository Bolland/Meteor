DepartmentsSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 50,
        unique: true
    }
});
Departments = new Mongo.Collection('departments');
Departments.attachSchema(DepartmentsSchema);
Departments.allow({
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