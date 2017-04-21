/* eslint-disable */
const config = require('../../config');
const SERVER = config.environment === 'DEV' ? config.development_server : config.production_server;

/** @ngInject */
class LoginController {
  	constructor($http, $state, Auth) {
		this.$state = $state;
        this.username = '';
        this.password = '';
        this.message = 'login';
		this.data = $state.current.data;
		this.$http = $http;
        this.Auth = Auth;

        let user = this.Auth.validateUserToken()
        if (user) {
            this.$state.go('dashboard');
        }

	}

    login(e) {
        e.preventDefault();
        this.Auth.login(this.username, this.password);

        //TODO: Handle form validation
    }
}

export const Login = {
	template: require('./login.html'),
	controller: LoginController
};
