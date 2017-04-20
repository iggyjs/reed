/* eslint-disable */
const config = require('../../config');
const SERVER = config.environment === 'DEV' ? config.development_server : config.production_server;

/** @ngInject */
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
        }

        this.user = this.getCurrentUserFromDB();
	}

    contentLoaded() {
        this.following = this.user.following;
        console.log(this.user);
    }


    getCurrentUserFromDB() {

        let endpoint = SERVER + '/api/currentUser';
        this.$http.get(endpoint, {
            headers : {
                'x-access-token': localStorage.getItem('reed-token')
            }
        }).then((res) => {
            if (res.status === 200) {
                this.user = res.data.user;
                this.contentLoaded();
            } else {
                // TODO: Throw error notification and botch the whole process
            }
        });


    }

}

export const Dashboard = {
	template: require('./dashboard.html'),
	controller: DashboardController
};
