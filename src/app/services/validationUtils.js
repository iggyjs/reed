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

	//HACK: Need to find long term solution as to why @ can't be passed around as a route?
    cleanUsername(username) {
		// Get rid of @ which is somehow fatal for this app???
	    return username.replace(new RegExp('@', 'g'), '_');
    }

    revertEmail(username) {
		return username.replace(new RegExp('_', 'g'), '@');
	}

}
