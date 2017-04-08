/* eslint-disable */

const SERVER = 'http://52.203.252.83:8000';
// const SERVER = 'http://localhost:8000';

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
