var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);

        //scripts 
        var scripts = document.querySelectorAll("head > script") || [];
        var reportData = [];

        for(var i=0; i<scripts.length; i++){
            if(scripts[i].innerHTML){
                reportData.push({
                    content : scripts[i].innerHTML
                });
            }
        }

        chrome.runtime.sendMessage({
            from: window.location.protocol + "//" + window.location.host,
            meta: {
                title: document.querySelector("head > title").innerHTML
            },
            report: reportData
        }, function(response){

            if(!response.newSpotting){
                return;
            }

            var overlayDiv = document.createElement('div');
            var claimLink = document.createElement('a');
            var meteorDiv = document.createElement('div');
            claimLink.setAttribute('href',response.claimUrl);
            claimLink.setAttribute('target','_blank');
            claimLink.setAttribute('class', 'claim-it wait-n-fadeIn');
            claimLink.style['background-image'] = 'url(' + chrome.extension.getURL("icons/growl.png") + ')';
            meteorDiv.setAttribute('class', 'meteorite shoot-meteor');
            meteorDiv.style['background-image'] = 'url(' + chrome.extension.getURL("icons/meteorite.png") + ')';
            overlayDiv.setAttribute('class','meteor-overlay animated fadeIn-n-Out');
            overlayDiv.style['background-image'] = 'url(' + chrome.extension.getURL("icons/background.png") + ')';
            overlayDiv.addEventListener('click', function(){
                document.body.removeChild(overlayDiv);
                document.body.removeChild(claimLink);
            });
            // overlayDiv.appendChild(claimLink);
            overlayDiv.appendChild(meteorDiv);
            document.body.appendChild(overlayDiv);
            document.body.appendChild(claimLink);
        });
    }
}, 10);