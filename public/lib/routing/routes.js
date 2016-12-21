
Router.route('/', {
    controller: 'ApplicationController',
    action: 'index'
});

Router.route('/wall-of-fame', {
    controller: 'ApplicationController',
    action: 'wall_of_fame'
});

Router.route('/departments', {
    controller: 'ApplicationController',
    action: 'departments'
});

Router.route('/admin', {
    controller: 'AdminController',
    action: 'index'
});