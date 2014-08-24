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
    });
});

Meteor.publish('currentSpotter', function(){
    if(this.userId){
        return Spotters.find({ 'user.id' : this.userId });
    }
});