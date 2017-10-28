/* eslint-disable */
const config = require('../config');
const SERVER = config.environment === 'DEV' ? config.development_server : config.production_server;


export class AuthService {
	/** @ngInject */
	constructor($http, $state, jwtHelper) {
		this.$http = $http;
		this.$state = $state;
		this.jwtHelper = jwtHelper;
	}


	logout() {
		localStorage.removeItem('reed-token');
		// go to dash
		this.$state.go('login');
	}

	validateUserToken() {
		let token = localStorage.getItem('reed-token');

		if (typeof token !== "undefined" && token !== null) {
			// a token is present, but we need to validate it
			let decoded = this.jwtHelper.decodeToken(token)._doc;

			if (decoded) {
				return decoded;
			} else {
				// redirect to login
				this.$state.go('login');
			}
		} else {
			// redirect to login
			this.$state.go('login');
		}
	}

	getUserToken() {
		let token = localStorage.getItem('reed-token');

		if (typeof token !== "undefined" && token !== null) {
			// a token is present, but we need to validate it
			let decoded = this.jwtHelper.decodeToken(token)._doc;

			if (decoded) {
				return decoded;
			} else {
				// redirect to login
				return null;
			}
		} else {
			// redirect to login
			return null;
		}
	}

}
