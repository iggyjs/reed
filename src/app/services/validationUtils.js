/* eslint-disable */
const config = require('../config');
const SERVER = config.environment === 'DEV' ? config.development_server : config.production_server;


export class ValidationUtilsService {
	/** @ngInject */
	constructor($http, $state, jwtHelper) {
		this.$http = $http;
		this.$state = $state;
		this.jwtHelper = jwtHelper;
	}

    cleanUsername(username) {
		// Get rid of @ which is somehow fatal for this app???
	    return username.replace(new RegExp('@', 'g'), '_');
    }

}
