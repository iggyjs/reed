let pageTitle, pageDescription, pageThumb = '';
let openInputs = false;

const SERVER = 'http:localhost:8000'

$(function() {

    let token = localStorage.getItem('reed-token');
    if (token === null) {
        renderLoggedOutState();
    } else {
        //call to content script
        renderLoggedInState();
    }
});

function renderLoggedOutState() {
    $('.reed-logged-out-view').show();
    $('.reed-logged-in-view').hide();


    $('#reedLoginForm').on('submit', (e) => {
        e.preventDefault();

        let username = $('#reedUsername').val();
        let password = $('#reedPassword').val();

        // prevent empty input
        if (username.length > 0 && password.length > 0) {
            let payload = {
                name: username,
                password: password
            };

            $.ajax({
                type: "POST",
                url: SERVER + "/api/login",
                data: payload,

                success: function(res) {
                    if (res.success) {
                        localStorage.setItem('reed-token', res.token);
                        //render login screen
                        renderLoggedInState();
                    } else {
                        //show error
                        $('#loginFailedMessage').show();
                        $('#loginFailedMessage').html('Incorrect username or password.');
                    }
                }
            });

        } else {
            // show error
            $('#loginFailedMessage').show();
            $('#loginFailedMessage').html('Bad! No empty inputs!');
        }
    });

}

function renderLoggedInState() {
    // hide any previous messages
    $('#postArticleFailed').hide();
    $('#postArticleSucceeded').hide();


    //hide login screen
    $('.reed-logged-out-view').hide();
    $('.reed-logged-in-view').show();

    // TODO: Handle case when data isn't available
    chrome.storage.local.get(null, function(data) {
        if (data.pageTitle.length > 0) {
            pageTitle = data.pageTitle;
            $("#pageTitle").html(data.pageTitle);
            $('#pageTitleInput').val(data.pageTitle);
        }


        if (data.pageDescription.length > 0) {
            pageDescription = data.pageDescription;
            $("#pageDescription").html(data.pageDescription);
            $('#pageDescriptionInput').val(data.pageDescription);
        } else {
            $("#pageDescription").html("No meta description found :(");
        }

        if (data.pageThumb.length > 0) {
            pageThumb = data.pageThumb
            $("#pageThumb").attr("src", data.pageThumb);
        } else {
            $("#pageThumb").hide();
            $("#pageTitle").css('padding-left', '20px');
            $("#pageDescription").css('padding-left', '20px');
        }

        $('#pageTitleInput').hide();
        $('#pageDescriptionInput').hide();

    });

    $('#reedRejectScrapedContent').on('click', () => {
        toggleInputs();
    });


    // When the submit article button is clicked
    $('#reedAcceptScrapedContent').on('click', () => {
        //since the inputs are initialized with the correct values, this works
        //in both cases if the use edits or not
        let title = $('#pageTitleInput').val();
        let des = $('#pageDescriptionInput').val();

        if (title.length > 0) {
            if (openInputs) {
                toggleInputs();
            }

            chrome.storage.local.get(null, function(data) {
                // will always be defined
                let payload = {
                    articleTitle: title,
                    articleDescription: des,
                    articleLink: data.pageLink
                }

                $.ajax({
                    type: "POST",
                    beforeSend: function(request) {
                        request.setRequestHeader('x-access-token', localStorage.getItem('reed-token'));
                    },
                    url: SERVER + '/api/addArticle',
                    data: payload,
                    success: function(res) {
                        if (res.success) {
                            // show success message
                            $('#postArticleFailed').hide();
                            $('#postArticleSucceeded').show();
                            $('#postArticleSucceeded').html('Successfully added article.');


                        } else {
                            // show err message
                            $('#postArticleSucceeded').hide();
                            $('#postArticleFailed').show();
                            $('#postArticleFailed').html('There was some error positing your aritcle.');

                        }
                    }
                });

            });

        } else {
            //show error
            $('#postArticleFailed').show();
            $('#postArticleFailed').html('You need a title. (Try some Command + Z)');

        }


    });
}

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
