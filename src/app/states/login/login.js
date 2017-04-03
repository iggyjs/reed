/* eslint-disable */
class LoginController {
  	constructor($http, $state) {
		this.$state = $state;
        this.message = 'login';
		this.data = $state.current.data;
		this.$http = $http;
	}
}

export const Login = {
	template: require('./login.html'),
	controller: LoginController
};
