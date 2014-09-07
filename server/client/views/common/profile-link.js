Template.profileLink.helpers({
    numberOfSpottings : function(){
        var spotter = Spotters.findOne({'user.id': Meteor.userId()});
        if(spotter !== undefined){
            return (spotter.spottingCount || 0);
        }
    }
});

