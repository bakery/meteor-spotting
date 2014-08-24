Spottings = new Meteor.Collection('spottings',{
    schema : new SimpleSchema({
        url : {
            type : String,
            regEx : SimpleSchema.RegEx.Url
        }, 
        count : {
            type : Number,
            min : 1,
            defaultValue : 1
        },
        spottedBy : {
            type : String
        },
        meta : {
            type : Object,
            blackbox : true
        },
        reported : {
            type : Date,
            autoValue : function() {
                if (this.isInsert) {
                    return new Date();
                } 
            },
            denyUpdate: true
        }   
    })
});

var __updateStats = function(){
    var stats = Stats.findOne({});
    if(stats){
        Stats.update(stats._id, { $inc: { spottingCount: 1 } });
    }
};

Spottings.after.insert(function(){ __updateStats(); });
Spottings.after.update(function(userId, doc, fieldNames){
    console.log('spotting updated', fieldNames);
    if(fieldNames.indexOf('count') !== -1){
        __updateStats();
    }
});

Spottings.deny({
  insert: function(){ return true; },
  update: function(){ return true; },
  remove: function(){ return true; },
});