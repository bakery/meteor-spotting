var Identity = {
    
    __key : 'user-id',

    generateUserId : function(){
        var guid = (function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
            }
            return function() {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            };
        })();


        localStorage.setItem(this.__key, guid());
    },

    getUserId : function(){
        return localStorage.getItem(this.__key);
    }
};