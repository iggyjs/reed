/* eslint-disable */
const config = require('../../config');
const SERVER = config.environment === 'DEV' ? config.development_server : config.production_server;

/** @ngInject */
class LogoutController {
  	constructor($state, Auth) {
		this.$state = $state;
        this.message = 'logout';
		this.data = $state.current.data;
        this.Auth = Auth;
        this.logout();
	}

    logout() {
        this.Auth.logout();
    }
}

export const Logout = {
    template: require('./logout.html'),
	controller: LogoutController
};
