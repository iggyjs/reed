/* eslint-disable */
const config = require('../../config');
const SERVER = config.environment === 'DEV' ? config.development_server : config.production_server;

/** @ngInject */
class DashboardController {
  	constructor($http, $state, Auth, ValidationUtils) {
		this.$state = $state;
        this.message = 'dashboard';
		this.data = $state.current.data;
		this.$http = $http;
        this.Auth = Auth;
        this.ValidationUtils = ValidationUtils;
        this.followingList = [];

        //check if we need to validate
        if (this.data.authRequired) {
            //set the current user
            let user = this.Auth.validateUserToken();
            this.handle = this.ValidationUtils.cleanUsername(user.name);
        }

        this.user = this.getCurrentUserFromDB();

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
                this.getFollowingFromDB();
            } else {
                // TODO: Throw error notification and botch the whole process
            }
        });


    }

    getFollowingFromDB() {
        let usersToGrab = this.user.following;
        let users = [];

        for (let i=0; i < usersToGrab.length; i++) {
            let endpoint = SERVER + '/api/user/guid/' + usersToGrab[i];

            this.$http.get(endpoint, {
                headers : {
                    'x-access-token': localStorage.getItem('reed-token')
                }
            }).then((res) => {
                if (res.status === 200) {
                    let user = res.data;
                    //get associated list
                    let tempGuid = res.data.guid
                    this.$http.get(SERVER + '/api/profileList', {
                        headers : {
                            'x-access-token': localStorage.getItem('reed-token')
                        },
                        params: {
                            userGuid: tempGuid
                        }
                    }).then((res) => {
                        if (res.status === 200) {
                            user.articles = res.data.articles;
                            users.push(user);
                        } else {
                            // TODO: Throw error notification and botch the whole process
                        }
                    });

                } else {
                    // TODO: Throw error notification and botch the whole process
                }
            });
        }

        this.followingList = users;
    }


}

export const Dashboard = {
	template: require('./dashboard.html'),
	controller: DashboardController
};
