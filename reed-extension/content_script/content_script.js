console.log('Running content script ... ');

// Get all the page meta data, and reset it, to be retrieved by the popup
// (every time)
let pageTitle = document.title;
let pageDescription = document.querySelector("meta[name=\'description\']").content;
let pageThumb = document.querySelector('meta[property="og:image"]').content;

chrome.storage.local.set({pageTitle: pageTitle, pageDescription: pageDescription, pageThumb: pageThumb});

console.log(pageThumb);
