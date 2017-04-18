/* eslint-disable */
const config = require('../../config');
const SERVER = config.environment === 'DEV' ? config.development_server : config.production_server;

/** @ngInject */
class CreateController {
  	constructor($http, $state, $location, Auth) {

        this.Auth = Auth;
		this.$state = $state;
        this.$location = $location;
        this.message = 'profile';
		this.data = $state.current.data;
		this.$http = $http;
        this.articleTitle = '';
        this.articleLink = '';
        this.articleDescription = '';

        let user = this.Auth.getUserToken();
        this.user = user;
	}


    submitList($event) {
        let payload = {
            articleTitle: this.articleTitle,
            articleDes: this.articleDescription,
            articleLink: this.articleLink
        };

        this.$http.post(SERVER + '/api/addArticle', payload, {
            headers : {
                'x-access-token': localStorage.getItem('reed-token')
            }
        }).then((res) => {
            console.log(res);
        });

    }

}

export const Create = {
	template: require('./create.html'),
	controller: CreateController
};
