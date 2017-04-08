/* eslint-disable */

const SERVER = 'http://localhost:8000';

class SearchController {
  	constructor($http, $state) {
		this.$state = $state;
        this.searchQuery = '';
		this.data = $state.current.data;
		this.$http = $http;
        this.allUsers = [];
        this.getAllUsers();
	}

    getAllUsers() {

        this.$http.get(SERVER + '/api/allUsers', {
            headers : {
                'x-access-token': localStorage.getItem('reed-token')
            }
        }).then((res) => {
            this.allUsers = res.data;
        });
    }

    goToProfile(user) {
        this.$state.go('profile');
    }
}

export const Search = {
	template: require('./search.html'),
	controller: SearchController
};
