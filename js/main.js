document.addEventListener("DOMContentLoaded", getCurrentTab);

function getCurrentTab() {
    return chrome.tabs.query({currentWindow: true, active:true}, launchAPI);
}

function showEmotion(emotions){
   emotions.forEach(element => {
       $("#emotions-container").append('<a href="#" class="tag emotions-tag">'+element+'</a>')
   });
}

function showKeywords(keywords){
    keywords.forEach(element => {
       $("#keywords-container").append('<li><a href="#" class="tag">'+element+'</a></li>')
        
    });
}

function linkToToma(url){
    $('#linkToToma').attr("href", "https://toma.ht/#/?url="+url);
    $('#linkToToma').attr("target", "_blank");
}

function urlize(text) {
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '" target="_blank">[Lien externe]</a>';
    });
}


function launchAPI(tab) {
    $("#icon-toma").hide();

    $('#recommandation-area').hide();
    var url = tab[0].url;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://toma.ht/backend/api/v0.1/request/?link="+url, true);
    xhr.send();

    xhr.onreadystatechange = function(){
        if (this.readyState == 4){
            if (this.status == 200) {
                // success
                data = JSON.parse(this.responseText);

                $('#recommandation-area').show();

                if(data.error){
                    var recommandation = data.message;
                    $('#recommandation-footer').remove();
                }else if(data.has_ressources){
                    var recommandation = data.recommandations;

                    recommandation = recommandation.split("<br/><br/>");
                    recommandation = recommandation.slice(0,2);
                    recommandation = recommandation.join("<br/><br/>");

                    // make link clickable
                    recommandation = urlize(recommandation);

                    showEmotion(data.dominante_emotions);
                    showKeywords(data.keywords);
                    linkToToma(url);

                }

                $("#spinner-area").remove();
                $("#logo-text").remove();
                $("#logo-toma").remove();
                $("#icon-toma").show();

                $("#recommandation-text").html(recommandation);

            }else{
                // Error
                $("#spinner-area").remove();
                $("#recommandation-title").html("Erreur");
                $("#recommandation-text").html("Erreur côté serveur. Veuillez recommencer");

            }

        }
    }
   
}