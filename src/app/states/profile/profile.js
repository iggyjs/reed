/* eslint-disable */
const SERVER = 'http://localhost:8000';

class ProfileController {
  	constructor($http, $state, $location) {
		this.$state = $state;
        this.$location = $location;
        this.message = 'profile';
		this.data = $state.current.data;
		this.$http = $http;
        this.findUser();
        // console.log($state);
	}

    findUser() {
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
                //handle redirect to 404 page
                this.$state.go('notFound');

            } else {
                this.profileUser = res.data;
            }
		});
    }
}

export const Profile = {
	template: require('./profile.html'),
	controller: ProfileController
};
