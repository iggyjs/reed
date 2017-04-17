/* eslint-disable */
const config = require('../../config');
const SERVER = config.environment === 'DEV' ? config.development_server : config.production_server;

/** @ngInject */
class CreateController {
  	constructor($http, $state, $location, Auth) {

        this.Auth = Auth;
		this.$state = $state;
        this.$location = $location;
        this.message = 'profile';
		this.data = $state.current.data;
		this.$http = $http;

        let user = this.Auth.getUserToken();
        this.user = user;
	}

}

export const Create = {
	template: require('./create.html'),
	controller: CreateController
};
