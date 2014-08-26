Meteor.publish('spottings', function(){
    return Spottings.find({});
});

Meteor.publish('stats', function(){
    return Stats.find({});
});

Meteor.publish('spotters', function(){
    return Spotters.find({
        user : {
            $exists : true
        }
    },{
        limit : Meteor.settings.public.spotters.showTop,
        sort : { spottingCount : -1 }
    });
});

Meteor.publish('currentSpotter', function(){
    if(this.userId){
        return Spotters.find({ 'user.id' : this.userId });
    }
});