/* eslint-disable */
class NotFoundController {
  	constructor($http, $state, $location) {
		this.$state = $state;
        this.$location = $location;
        this.message = 'profile';
		this.data = $state.current.data;
		this.$http = $http;
	}

}

export const NotFound = {
	template: require('./notFound.html'),
	controller: NotFoundController
};
