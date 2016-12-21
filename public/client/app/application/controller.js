
ApplicationController = BaseController.extend({

    index: function () {
        this.render('index_index');
    },

    wall_of_fame: function () {
        this.render('index_wall_of_fame');
    },

    departments: function () {
        this.render('index_departments');
    }

});