ExplorerRegistration = RouteController.extend({
    template: 'explorerRegistration',
    fastRender: true,
    
    data: function () {

        var controller = this;

        Deps.autorun(function () {
            var currentUser = Meteor.user();
            if(currentUser){
                console.log('somebody logged in');
                Meteor.call('registerExplorer',{
                    extensionId : controller.params._extensionId
                }, function(error,result){
                    if(!error){
                        Router.go('/me');
                    }
                });
            }
        });

        return {
            currentUser : Meteor.user()
        };
    }
});