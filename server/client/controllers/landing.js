LandingController = RouteController.extend({
    template: 'landing',

    waitOn: function () {
        return [
            Meteor.subscribe('spottings'),
            Meteor.subscribe('spotters'),
            Meteor.subscribe('stats')
        ];
    },

    data: function () {
        return {
            spottings : Spottings.find({},{
                sort : { count : -1 }
            }),
            spotters : Spotters.find({},{
                sort : { spottingCount : -1 }
            }),
            stats : Stats.findOne({})
        };
    }

    // action: function () {
    //  if we want to override default behavior 
    // }
});