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
            this.Auth.validateUserToken();

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
                console.log(res);
                this.user = res.data.user;
                // For now, the only thing that the notifications state contains is follow requests
                this.followRequests = this.getFollowRequests();

            } else {
                // TODO: Throw error notification and botch the whole process
            }
        });


    }


    getFollowRequests() {
        let users = [];
        let reqs = this.user.followRequests;
        // we need the users for these requests

        for (let i=0; i<reqs.length; i++) {
            let endpoint = SERVER + '/api/user/guid/' + reqs[i];

            this.$http.get(endpoint, {
                headers : {
                    'x-access-token': localStorage.getItem('reed-token')
                }
            }).then((res) => {
                if (res.status === 200) {
                    users.push(res.data);
                } else {
                    // TODO: Throw error notification and botch the whole process
                }
            });
        }

        return users;
    }


    acceptFollowRequest(request) {
        let payload = {reqGuid: request.guid};

        this.$http.post(SERVER + '/api/followAccept', payload, {
            headers : {
                'x-access-token': localStorage.getItem('reed-token')
            }
        }).then((res) => {
            if (res.status === 200) {
                let idx = this.followRequests.indexOf(request);
                this.followRequests.splice(idx, 1);

                console.log(res);
                console.log('User follow accepted');

            } else {
                //TODO: show error message
            }
        });
    }

    ignoreFollowRequest(request) {
        let payload = {reqGuid: request.guid};

        this.$http.post(SERVER + '/api/followIgnore', payload, {
            headers : {
                'x-access-token': localStorage.getItem('reed-token')
            }
        }).then((res) => {
            if (res.status === 200) {
                let idx = this.followRequests.indexOf(request);
                this.followRequests.splice(idx, 1);

                console.log(res);
                console.log('User follow ignored');

            } else {
                //TODO: show error message
            }
        });
    }

}

export const Notifications = {
	template: require('./notifications.html'),
	controller: NotificationsController
};
