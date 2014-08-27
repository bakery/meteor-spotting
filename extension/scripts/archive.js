var Archive = {

    __key : 'link-archive',

    add : function(url){
        var links = localStorage.getItem(this.__key);
        
        if(links){
            links = JSON.parse(links);
        } else {
            links = [];
        }


        if(links.indexOf(url) === -1){
            links.push(url);
            localStorage.setItem(this.__key,JSON.stringify(links));
        } 
    },

    isIn : function(url){
        var links = localStorage.getItem(this.__key);
        if(links){
            links = JSON.parse(links);
        } else {
            links = [];
        }
        return links.indexOf(url) !== -1; 
    }
};