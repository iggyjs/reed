/* eslint-disable */
const config = require('../../config');
const SERVER = config.environment === 'DEV' ? config.development_server : config.production_server;

/** @ngInject */
class LandingController {
  	constructor($http, $state, Auth) {
		this.$state = $state;
        this.Auth = Auth;
        this.bannerFourBackgroundChanged = false;

        let token = this.Auth.getUserToken();

        if (token) {
            //we have some token
            // try redirecting to dashboard
            //will send returning users to the login screen
            let user = this.Auth.validateUserToken();
            if (user) {
                this.$state.go('dashboard');
            }
        }
	}
}

export const Landing = {
	template: require('./landing.html'),
	controller: LandingController
};
