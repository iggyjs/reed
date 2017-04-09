/* eslint-disable */
const config = require('../../config');
const SERVER = config.environment === 'DEV' ? config.development_server : config.production_server;

/** @ngInject */
class TempHomeController {
  	constructor($http, $state, $location) {
		this.$state = $state;
        this.title = '';
        this.$location = $location;
		this.$http = $http;
        this.lists = [];
        this.getLists();
	}

    getLists() {
        this.$http.get(SERVER + '/api/lists')
        .then((res) => {
            console.log(res);
            this.lists = res.data;
        });
    }

    submit(e) {
        e.preventDefault();
        //execute post request to create a new list
        let payload = {title: this.title};

        this.$http.post(SERVER + '/api/lists', payload)
        .then((res) => {
            if (res.data.success) {
                alert('List saved!');
                location.reload();
            }
        });
    }

}

export const TempHome = {
	template: require('./tempHome.html'),
	controller: TempHomeController
};
