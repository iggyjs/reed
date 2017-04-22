console.log('Running content script ... ');
updateStorage();

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === 'run') {
        updateStorage();
        sendResponse(true);
    }
});


function updateStorage() {
    // Get all the page meta data, and reset it, to be retrieved by the popup
    // (every time)
    let pageTitle = document.title;

    let pageDescription = document.querySelector("meta[name=\'description\']");
    pageDescription = pageDescription !== null ? pageDescription.content : '';

    let pageThumb = document.querySelector('meta[property="og:image"]');
    pageThumb = pageThumb !== null ? pageThumb.content : '';

    let pageLink = window.location.href;

    chrome.storage.local.set({pageTitle: pageTitle, pageDescription: pageDescription, pageThumb: pageThumb, pageLink: pageLink});
}
