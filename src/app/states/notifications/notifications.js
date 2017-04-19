/* eslint-disable */
const config = require('../../config');
const SERVER = config.environment === 'DEV' ? config.development_server : config.production_server;

/** @ngInject */
class NotificationsController {
  	constructor($http, $state, Auth) {
		this.$state = $state;
        this.message = 'dashboard';
		this.data = $state.current.data;
		this.$http = $http;
        this.Auth = Auth;

        //check if we need to validate
        if (this.data.authRequired) {
            //set the current user
            let user = this.Auth.validateUserToken();
            this.user = user;
        }

        this.contentLoaded();

	}

    contentLoaded() {
        this.following = this.user.following;
    }


}

export const Notifications = {
	template: require('./notifications.html'),
	controller: NotificationsController
};
