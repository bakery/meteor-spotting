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
            claimLink.setAttribute('href',response.claimUrl);
            claimLink.setAttribute('target','_blank');
            claimLink.innerHTML = 'Claim it!';
            overlayDiv.setAttribute('class','meteor-overlay animated tada');
            overlayDiv.style['background-image'] = 'url(' + chrome.extension.getURL("icons/meteor-discovered.png") + ')';
            overlayDiv.addEventListener('click', function(){
                document.body.removeChild(overlayDiv);
            });
            overlayDiv.innerHTML = 'bam! you discovered a meteor';
            overlayDiv.appendChild(claimLink);
            document.body.appendChild(overlayDiv); 
        });
    }
}, 10);