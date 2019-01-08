document.addEventListener("DOMContentLoaded", getCurrentTab);

function getCurrentTab() {
    return chrome.tabs.query({currentWindow: true, active:true}, openToma);
}

function openToma(tab) {
       chrome.tabs.create({url:"https://toma.ht:/#/?url="+tab[0].url});
}