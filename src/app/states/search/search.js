/* eslint-disable */

const config = require('../../config');
const SERVER = config.environment === 'DEV' ? config.development_server : config.production_server;

class SearchController {
    /** @ngInject */
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
