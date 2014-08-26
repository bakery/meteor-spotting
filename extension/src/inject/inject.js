var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);

        var installationTag = document.createElement('div');
        installationTag.setAttribute('class','meteor-spotting-is-installed');
        installationTag.setAttribute('style','display:none;');
        document.body.appendChild(installationTag);

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
            var meteorDiv = document.createElement('div');
        
            meteorDiv.setAttribute('class', 'meteorite shoot-meteor');
            meteorDiv.style['background-image'] = 'url(' + chrome.extension.getURL("icons/meteorite.png") + ')';
            overlayDiv.setAttribute('class','meteor-overlay animated fadeIn');
            overlayDiv.style['background-image'] = 'url(' + chrome.extension.getURL("icons/background.png") + ')';
            overlayDiv.addEventListener('click', function(){
                document.body.removeChild(overlayDiv);
            });
            overlayDiv.innerHTML = 'You discovered a meteor!';
            overlayDiv.appendChild(meteorDiv);
            
            if(response.needsClaim){
                var claimLink = document.createElement('a');
                claimLink.setAttribute('href',response.claimUrl);
                claimLink.setAttribute('target','_blank');
                claimLink.innerHTML = 'Claim it!';
                overlayDiv.appendChild(claimLink);
            }
            
            document.body.appendChild(overlayDiv);
        });
    }
}, 10);