Meteor.methods({
    reportSpotting : function(report){
        
        console.log('new report', report);

        check(report, {
            url : String,
            meta : Object,
            spottedBy : String
        });

        var url = report.url;
        var spotting = Spottings.findOne({ url : url });
        var spotter = Spotters.findOne({ extensionId : report.spottedBy });
        var newSpotting = false;

        if(spotting){
            Spottings.update(spotting._id, { $inc: { count: 1 } });
        } else {
            newSpotting = true;
            Spottings.insert({
                url : url,
                meta : report.meta,
                spottedBy : report.spottedBy
            });
        }

        var spottingData = _.omit(_.extend(report, {
            newSpotting : newSpotting
        }),'spottedBy');

        if(spotter){
            var spottings = spotter.spottings || [];
            if(!_.find(spottings, function(sp){ return sp.url === report.url; })){
                Spotters.update(spotter._id,  {
                    $push: { spottings: spottingData }
                });
            }
        } else {
            console.log('spotting', _.omit(report,'spottedBy'));

            Spotters.insert({
               extensionId : report.spottedBy,
               spottings : [spottingData]
            });
        }


        return {
            newSpotting : newSpotting,
            needsClaim : spotter ? (typeof spotter.user === 'undefined') : true
        };
    },

    registerExplorer : function(explorer){
        
        console.log('registering explorer', explorer);

        check(explorer, {
            extensionId : String
        });

        var currentUser = Meteor.user();

        if(!currentUser){
            throw new Meteor.Error(500, { reason : 'Nobody is logged in'});
        }

        var spotter = Spotters.findOne({ extensionId : explorer.extensionId });
        var user = {
            id : currentUser._id,
            screenName : currentUser.services.twitter.screenName,
            profileImage : currentUser.services.twitter.profile_image_url
        };

        if(spotter){
            Spotters.update(spotter._id, { $set : {
                user : user
            }});
        } else {
            Spotters.insert({
                extensionId : explorer.extensionId,
                user : user,
                spottings : []
            });
        }
    }
});