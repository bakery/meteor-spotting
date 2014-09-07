LandingController = RouteController.extend({
    template: 'landing',
    fastRender: true,
    
    waitOn: function () {
        return [
            Meteor.subscribe('recent-discoveries'),
            Meteor.subscribe('spotters'),
            Meteor.subscribe('stats'),
            Meteor.subscribe('userData')
        ];
    },

    data: function () {
        return {
            spottings : SpottingsHelper.getRecentDisoveries(),
            spotters : Spotters.find({},{
                sort : { spottingCount : -1 }
            }),
            stats : Stats.findOne({}),
            currentUser : Meteor.user()
        };
    }
});