
// // create a context menu
// chrome.contextMenus.create({
//     id:"analyseWithToma",
//     title:"Analysez avec Toma",
//     contexts:["all"]
// });


// // add action listener
// chrome.contextMenus.onClicked.addListener(do_action);

// function do_action(info, tab){
//     const url = "https://toma.ht/#/?url="+tab.url;
    
//     chrome.tabs.create({
//         url:url
//     });

// }