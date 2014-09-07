Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {
  this.route('landing', {
    path: '/',
    controller : 'LandingController'
  });

  this.route('', {
    path: '/explorer/:_extensionId',
    controller: 'ExplorerRegistration'
  });

  this.route('', {
    path: '/me',
    controller: 'ExplorerProfile'
  });
});