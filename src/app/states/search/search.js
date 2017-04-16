/* eslint-disable */

const config = require('../../config');
const SERVER = config.environment === 'DEV' ? config.development_server : config.production_server;
const TEMP_HOST = 'http://localhost:3000/'

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
        // HACK: Need a better way to do this using $stateProvider
        window.location.href = TEMP_HOST + '@' + user.name;
    }
}

export const Search = {
	template: require('./search.html'),
	controller: SearchController
};
