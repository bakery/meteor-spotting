Stats = new Meteor.Collection('stats',{
    schema : new SimpleSchema({
        spottingCount : {
            type : Number,
            min : 0,
            defaultValue : 0
        },
        spotterCount : {
            type : Number,
            min : 0,
            defaultValue : 0
        },
        lastSpotting : {
            type : Date,
            autoValue: function() {
              if (this.isUpdate) {
                return new Date();
              }
            },
            denyInsert: true,
            optional: true
        } 
    })
});

Stats.deny({
  insert: function(){ return true; },
  update: function(){ return true; },
  remove: function(){ return true; },
});