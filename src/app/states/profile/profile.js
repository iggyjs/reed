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
	}

    findUser() {
        let userId = this.$location.$$url;
        let parsedUserId = userId.substring(2, userId.length);

        // //search by user id
        // let config = {
        //     headers: {
        //         'x-access-token': localStorage.getItem('reed-token')
        //     }
        // }

        let endpoint = SERVER + '/api/user/' + parsedUserId;

        // let req = {
        //     method: 'POST',
        //     url: 'http://example.com',
        //     headers: {
        //     'Content-Type': undefined
        //     },
        //
        // }

        this.$http.get(endpoint, {
            headers : {
                'x-access-token': localStorage.getItem('reed-token')
            }
        }).then((res) => {
			console.log(res);
		});

    }
}

export const Profile = {
	template: require('./profile.html'),
	controller: ProfileController
};
