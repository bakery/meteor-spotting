chrome.runtime.onInstalled.addListener(function(info){
    console.log('on installed', arguments);
    // info.reason

    if(!Identity.getUserId()){
        Identity.generateUserId();
    }
});


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){


    if(message.request === 'identity'){
        sendResponse({ 
            id : Identity.getUserId(),
            urlBase : ApplicationSettings.explorerRegistrationUrl
        });
        
        return;
    }


    function showSpottingNoification(newSpotting){
        chrome.pageAction.setIcon({
            tabId: sender.tab.id,
            path:  newSpotting ? '/icons/new-meteor.png' : '/icons/meteor.png'
        });


        chrome.pageAction.setPopup({
            tabId: sender.tab.id,
            popup:  newSpotting ? '/popups/new-spotting.html' : '/popups/spotting.html'
        });

        chrome.pageAction.show(sender.tab.id);
    }

    if(typeof message.report !== 'undefined'){
        console.log('got a report', message.report, 'from', message.from);

        var foundMeteorTraces = false; 

        for(var i=0; i<message.report.length; i++){
            var content = message.report[i].content;
            if(content.indexOf("__meteor_runtime_config__") !== -1){
                foundMeteorTraces = true;
                break;
            }
        }

        if(foundMeteorTraces){
            console.log("BANG!");

            if(Archive.isIn(message.from) && !ApplicationSettings.allowMultipleReports){
                console.log(message.from, 'already reported... skipping');
                showSpottingNoification(false);
                return;
            }

            function normalizeUrlProtocol(url){
                // move everything to http
                if(url.indexOf("https://") !== -1){
                    url = url.replace("https://","http://");
                }

                if(url.indexOf("http://") === -1){
                    url = ["http://",url].join('');
                }

                return url;
            }

            var spotting = { 
                url : normalizeUrlProtocol(message.from),
                meta : message.meta,
                spottedBy : Identity.getUserId()
            };

            Meteor.call('reportSpotting',spotting, function(err,res){
                if (err){ 
                    console.error(err);
                } else {

                    console.log('server response', res);

                    Archive.add(message.from);
                    showSpottingNoification(res.newSpotting);

                    sendResponse({ 
                        newSpotting : true,
                        needsClaim : res.needsClaim,
                        claimUrl : ApplicationSettings.explorerRegistrationUrl + Identity.getUserId()
                    });
                }

                console.log(res);    
            });
        } 
    }

    return true;
});