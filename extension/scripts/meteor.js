// uses ddp.js

var Meteor = {
    call : function(methodName, params, callback){
        var options = {
            endpoint: ApplicationSettings.meteorSocketEndpoint,
            SocketConstructor: WebSocket
        };

        var ddp = new DDP(options);

        ddp.on("connected", function () {
            console.log("Connected");

            ddp.method(methodName, [params], callback || function(err,data){
                console.log('called',methodName,err,data);
            });
        });
    }
};