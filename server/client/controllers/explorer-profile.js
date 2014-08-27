ExplorerProfile = RouteController.extend({
    template: 'explorerProfile',
    fastRender: true,

    waitOn: function () {
        return [
            Meteor.subscribe('currentSpotter'),
            Meteor.subscribe('userData')
        ];
    },

    data: function () {
        return {
            profile : Spotters.findOne({ 'user.id' : Meteor.userId() }),
            currentUser : Meteor.user()
        };
    }
});