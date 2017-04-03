/* eslint-disable */
class DashboardController {
  	constructor($http, $state) {
		this.$state = $state;
        this.message = 'test';
		this.data = $state.current.data;
		this.$http = $http;
	}
}

export const Dashboard = {
	template: require('./dashboard.html'),
	controller: DashboardController
};
