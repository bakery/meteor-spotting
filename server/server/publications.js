Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
        {
            fields: {
                'services.twitter.screenName': 1,
                'services.twitter.profile_image_url': 1
            }
        }
    );
  } else {
    this.ready();
  }
});

Meteor.publish('spottings', function(){
    return Spottings.find({},{
        sort : { spottingCount : -1 },
        limit : Meteor.settings.public.spottings.showTop
    });
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