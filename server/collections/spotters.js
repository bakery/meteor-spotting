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

        'spottingCount' : {
            type: Number,
            autoValue: function() {
                var spottings = this.field('spottings');
                console.log('autovalue for',spottings);
                if (spottings.isSet) {
                    return spottings.value.length;
                } else {
                    this.unset();
                }
            }
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