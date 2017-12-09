/* eslint-disable */
const config = require('../../config');
const SERVER = config.environment === 'DEV' ? config.development_server : config.production_server;
const HOST = config.environment === 'DEV' ? config.development_host : config.production_host;

class SearchController {
    /** @ngInject */
  	constructor($http, $state, Auth, ValidationUtils) {
		this.$state = $state;
        this.Auth = Auth;
        this.ValidationUtils = ValidationUtils;
        this.searchQuery = '';
		this.data = $state.current.data;
		this.$http = $http;
        this.allUsers = [];
        this.getAllUsers();
        this.user = this.Auth.getUserToken();
        this.handle = this.ValidationUtils.cleanUsername(this.user.name);
	}

    // TODO: Hide before searching

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

        this.$state.go('profile', {userId: this.ValidationUtils.cleanUsername(user.name)});
    }
}

export const Search = {
	template: require('./search.html'),
	controller: SearchController
};
