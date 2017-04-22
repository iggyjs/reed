chrome.tabs.onActivated.addListener(function (tab){
    chrome.tabs.sendMessage(tab.tabId, {action: "run"}, function(response) {
        console.log(response);
    });
});
