/* eslint-disable */
class SearchController {
  	constructor($http, $state) {
		this.$state = $state;
        this.message = 'search';
		this.data = $state.current.data;
		this.$http = $http;
	}
}

export const Search = {
	template: require('./search.html'),
	controller: SearchController
};
