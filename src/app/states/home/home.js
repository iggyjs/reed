/* eslint-disable */
class HomeController {
  	constructor($http, $state) {
		this.$state = $state;
		this.data = $state.current.data;
		this.$http = $http;
	}
}

export const Home = {
	template: require('./Home.html'),
	controller: HomeController
};
