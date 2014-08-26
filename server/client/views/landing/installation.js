Template.installation.helpers({
    'mustInstallExtension' : function(){
        return chrome && ($('.meteor-spotting-is-installed').length === 0);
    }
});