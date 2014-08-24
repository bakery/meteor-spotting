document.addEventListener('DOMContentLoaded', function () {
    
    chrome.runtime.sendMessage({request: 'identity'}, function(response) {
        console.log('got data', response.id);
        if((typeof response.id !== 'undefined') && (typeof response.urlBase !== 'undefined')){
            document.querySelector('.explorer-profile-link')
                .setAttribute('href', response.urlBase + response.id);
        }

        var links = document.getElementsByTagName("a");
        for (var i = 0; i < links.length; i++) {
            (function () {
                var ln = links[i];
                var location = ln.href;
                ln.onclick = function () {
                    console.log('popup clicking');
                    chrome.tabs.create({active: true, url: location});
                };
            })();
        }
    });
});