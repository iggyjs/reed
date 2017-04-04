/* eslint-disable */
class SignupController {
  	constructor($http, $state, Auth) {
		this.$state = $state;
        this.username = '';
        this.password = '';
        this.password2 = '';
        this.Auth = Auth;
		this.data = $state.current.data;
		this.$http = $http;
	}

    signup(e) {
        e.preventDefault();

    }
}

export const Signup = {
	template: require('./signup.html'),
	controller: SignupController
};
