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

        this.findUserByLocation();

        let user = this.Auth.getUserToken();
        this.user = user;
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
                if (this.user !== null) {
                    this.checkIfProfileIsCurrentUser();
                }
            }
		});
    }

    checkIfProfileIsCurrentUser() {
        console.log(this.profileUser);

        if ((this.user.name === this.profileUser.username) && (this.user.guid === this.profileUser.guid)) {
            this.profileIsCurrentUser = true;
        }
    }
}

export const Profile = {
	template: require('./profile.html'),
	controller: ProfileController
};
