Template.spotter.helpers({
	numberOfSpottings : function(){
		return (this.spottings || []).length;
	},

	discoveries : function(){
		var discoveries = _.filter(this.spottings, function(s){
			return s.newSpotting;
		});

		return discoveries.length > 0 ? discoveries : null;
	},

    numberOfDiscoveries : function(){
        var discoveries = _.filter(this.spottings, function(s){
            return s.newSpotting;
        });

        return discoveries.length > 0 ? discoveries.length : null;
    }
});