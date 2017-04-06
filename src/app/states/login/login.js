/* eslint-disable */
class LoginController {
  	constructor($http, $state, Auth) {
		this.$state = $state;
        this.username = '';
        this.password = '';
        this.message = 'login';
		this.data = $state.current.data;
		this.$http = $http;
        this.Auth = Auth;
	}

    login(e) {
        e.preventDefault();
        this.Auth.login(this.username, this.password);

        //TODO: Handle form validation
    }
}

export const Login = {
	template: require('./login.html'),
	controller: LoginController
};
