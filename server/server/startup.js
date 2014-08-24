Meteor.startup(function(){

    Accounts.loginServiceConfiguration.remove({
        service : 'twitter'
    });

    Accounts.loginServiceConfiguration.insert({
        service     : 'twitter',
        consumerKey : Meteor.settings.private.twitter.consumerKey,
        secret      : Meteor.settings.private.twitter.secret
    });


    var stats = Stats.findOne({});
    if(!stats){
        Stats.insert({ spottingCount : 0 });
    }
});