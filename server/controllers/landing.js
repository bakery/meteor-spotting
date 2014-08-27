LandingController = FastRender.RouteController.extend({
    template: 'landing',
    
    waitOn: function () {
        return [
            Meteor.subscribe('spottings'),
            Meteor.subscribe('spotters'),
            Meteor.subscribe('stats'),
            Meteor.subscribe('userData')
        ];
    },

    data: function () {
        return {
            spottings : Spottings.find({},{
                sort : { lastSpottedAt : -1 }
            }),
            spotters : Spotters.find({},{
                sort : { spottingCount : -1 }
            }),
            stats : Stats.findOne({}),
            currentUser : Meteor.user()
        };
    }
});