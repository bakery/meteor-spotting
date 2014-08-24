Spotters = new Meteor.Collection('spotters',{
    schema : new SimpleSchema({
        'extensionId' : {
            type: String
        },

        'user' : {
            type: Object,
            blackbox: true,
            optional: true
        },

        'spottings' : {
            type: [Object]
        },

        'spottings.$.url': {
            type : String,
            regEx : SimpleSchema.RegEx.Url
        },
        'spottings.$.newSpotting': {
            type : Boolean
        },
        'spottings.$.meta': {
            type: Object,
            blackbox: true
        }
    })
});

Spotters.after.insert(function(){
    var stats = Stats.findOne({});
    if(stats){
        Stats.update(stats._id, { $inc: { spotterCount: 1 } });
    }
});