/* eslint-disable */
class SignupController {
  	constructor($http, $state) {
		this.$state = $state;
        this.message = 'signup';
		this.data = $state.current.data;
		this.$http = $http;
	}
}

export const Signup = {
	template: require('./signup.html'),
	controller: SignupController
};
