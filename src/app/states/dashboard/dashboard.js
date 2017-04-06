/* eslint-disable */
class DashboardController {
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

    }


}

export const Dashboard = {
	template: require('./dashboard.html'),
	controller: DashboardController
};
