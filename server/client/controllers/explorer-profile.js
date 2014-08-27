ExplorerProfile = RouteController.extend({
    template: 'explorerProfile',
    fastRender: true,

    waitOn: function () {
        return [
            Meteor.subscribe('currentSpotter')    
        ];
    },

    data: function () {
        return {
            profile : Spotters.findOne({ 'user.id' : Meteor.userId() })
        };
    }
});