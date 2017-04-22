$(function() {
    //call to content script
    chrome.storage.local.get(null, function(data) {
        if (data.pageDescription) {
            $("#pageDescription").html(data.pageDescription);
        }

        if (data.pageTitle) {
            $("#pageTitle").html(data.pageTitle);
        }

        if (data.pageThumb) {
            $("#pageThumb").html(data.pageThumb);
        }
    });

    $('#reedRejectScrapedContent').on('click', () => {
        console.log($(this));
    });

    $('#reedAcceptScrapedContent').on('click', () => {
        console.log($(this));
    });
});
