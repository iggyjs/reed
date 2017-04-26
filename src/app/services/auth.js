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

	signup(username, password) {
		let payload = {name: username, password: password};

		//execute post request to create a new user
		this.$http.post(SERVER + '/api/signup', payload)
		.then((res) => {
			let status = res.status;
			let success = res.data.success;
			let token = res.data.token;

			if (status === 200 && success) {
				//store token
				localStorage.setItem('reed-token', token);
				// go to dash
				this.$state.go('dashboard');
			} else {
				//handle err
				console.log('There was some error creating a user.');
			}
		});
	}

	login(username, password) {
		let payload = {name: username, password: password};

		this.$http.post(SERVER + '/api/login', payload)
		.then((res) => {
			if (res.status === 200) {

				if (res.data.success) {
					//successful login
					let token = res.data.token;
					localStorage.setItem('reed-token', token);
					// go to dash
					this.$state.go('dashboard');

				} else {
					//show failed login notification
				}
			} else {
				//handle HTTP Error
			}

		});
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
