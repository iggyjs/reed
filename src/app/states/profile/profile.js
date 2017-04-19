/* eslint-disable */
const config = require('../../config');
const SERVER = config.environment === 'DEV' ? config.development_server : config.production_server;

/** @ngInject */
class ProfileController {
  	constructor($http, $state, $location, Auth) {

        this.Auth = Auth;
		this.$state = $state;
        this.$location = $location;
        this.message = 'profile';
		this.data = $state.current.data;
		this.$http = $http;
        this.profileIsCurrentUser = false;

        // create article stuff
        this.addingArticle = false;
        this.articleTitle = '';
        this.articleLink = '';
        this.articleDescription = '';

        this.findUserByLocation();
        this.user = this.Auth.getUserToken();
	}

    findUserByLocation() {
        let userId = this.$location.$$url;
        let parsedUserId = userId.substring(2, userId.length);

        // //search by user id
        let endpoint = SERVER + '/api/user/' + parsedUserId;
        this.$http.get(endpoint, {
            headers : {
                'x-access-token': localStorage.getItem('reed-token')
            }
        }).then((res) => {
            if (res.data.userNotFound) {
                //server returned no user found
                this.$state.go('notFound');
            }

            else {
                this.profileUser = res.data;
                this.getProfileData(this.profileUser);

                if (this.user !== null) {
                    this.checkIfProfileIsCurrentUser();
                }
            }
		});
    }

    getProfileData(user) {
        let guid = user.guid;
        // get this users listTitle
        this.$http.get(SERVER + '/api/currList', {
            headers : {
                'x-access-token': localStorage.getItem('reed-token')
            },
            params: {
                userGuid: guid
            }
        }).then((res) => {
            this.profileList = res.data;
		});

    }

    checkIfProfileIsCurrentUser() {
        if ((this.user.name === this.profileUser.username) && (this.user.guid === this.profileUser.guid)) {
            this.profileIsCurrentUser = true;
        }
    }

    toggleAddArticle() {
        this.addingArticle = !this.addingArticle;

        if (!this.addingArticle) {
            this.articleTitle = '';
            this.articleLink = '';
            this.articleDescription = '';
        }
    }


    // HACK: This is a development only method
    clearArticles() {
        this.$http.post(SERVER + '/api/clearCurrList', {}, {
            headers : {
                'x-access-token': localStorage.getItem('reed-token')
            }
        }).then((res) => {
            if (res.status === 200) {
                this.profileList = res.data.list;
            } else {
                //show error message
            }
        });
    }

    deleteArticle(article) {
        console.log(article);
    }

    // TODO: Add form validation
    submitList($event) {
        let payload = {
            articleTitle: this.articleTitle,
            articleDes: this.articleDescription,
            articleLink: this.articleLink
        };

        this.$http.post(SERVER + '/api/addArticle', payload, {
            headers : {
                'x-access-token': localStorage.getItem('reed-token')
            }
        }).then((res) => {
            if (res.status === 200) {
                this.profileList = res.data.list;
                this.toggleAddArticle();
            } else {
                //show error message
            }
        });

    }
}

export const Profile = {
	template: require('./profile.html'),
	controller: ProfileController
};
