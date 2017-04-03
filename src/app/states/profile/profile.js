/* eslint-disable */
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
        let parsedUserId = userId.substring(1, userId.length);

        //search by user id
        
    }
}

export const Profile = {
	template: require('./profile.html'),
	controller: ProfileController
};
