let pageTitle, pageDescription, pageThumb = '';
let openInputs = false;


$(function() {

    //initially hide the inputs

    //call to content script
    chrome.storage.local.get(null, function(data) {
        if (data.pageDescription.length > 0) {
            pageDescription = data.pageDescription;
            $("#pageDescription").html(data.pageDescription);
            $('#pageDescriptionInput').val(data.pageDescription);
        }

        if (data.pageTitle.length > 0) {
            pageTitle = data.pageTitle;
            $("#pageTitle").html(data.pageTitle);
            $('#pageTitleInput').val(data.pageTitle);
        }

        if (data.pageThumb.length > 0) {
            pageThumb = data.pageThumb
            $("#pageThumb").attr("src", data.pageThumb);
        }


        $('#pageTitleInput').hide();
        $('#pageDescriptionInput').hide();

    });

    $('#reedRejectScrapedContent').on('click', () => {
        toggleInputs();

    });

    $('#reedAcceptScrapedContent').on('click', () => {
        console.log($(this));
        // TODO: Ajax call to endpoint using jquery
    });
});


function toggleInputs() {
    if (openInputs) {
        // hide the inputs and show scraped elements
        $('#pageTitleInput').hide();
        $('#pageDescriptionInput').hide();

        $('#pageTitle').show();
        $('#pageDescription').show();
    } else {
        //show inputs hide scraped elements
        $('#pageTitleInput').show();
        $('#pageDescriptionInput').show();

        $('#pageTitle').hide();
        $('#pageDescription').hide();
    }

    openInputs = !openInputs;
}
