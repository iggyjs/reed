/* eslint-disable */
const config = require('../../config');
const SERVER = config.environment === 'DEV' ? config.development_server : config.production_server;

/** @ngInject */
class LoginController {
  	constructor($http, $state, Auth) {
		this.$state = $state;
        this.username = '';
        this.password = '';
		this.data = $state.current.data;
		this.$http = $http;
        this.Auth = Auth;

        this.error = false;
        this.errorMessage = '';

        let user = this.Auth.validateUserToken()
        if (user) {
            this.$state.go('dashboard');
        }

	}

    login(e) {
        e.preventDefault();

        let usernameNotEmpty = this.username.length > 0 ? true : false
        let passwordNotEmpty = this.password.length > 0 ? true : false

        if (usernameNotEmpty && passwordNotEmpty) {
            this.AuthLogin(this.username, this.password);
        } else {
            if (!usernameNotEmpty) {
                this.error = true;
                this.errorMessage = 'Empty usernames aren\'t a thing.';
            }

            if (!passwordNotEmpty) {
                this.error = true;
                this.errorMessage = 'Looks like you\'re missing something.';
            }
        }
    }

    AuthLogin(username, password) {
        let payload = {name: username, password: password};

        this.$http.post(SERVER + '/api/login', payload)
        .then((res) => {
            if (res.status === 200) {

                if (res.data.success) {
                    //successful login
                    let token = res.data.token;
                    localStorage.setItem('reed-token', token);
                    // go to dash
                    this.$state.go('dashboard');

                } else {
                    //show failed login notification
                    this.error = true;
                    this.errorMessage = 'Username or password lookup failed.';
                }
            } else {
                //handle HTTP Error
                this.error = true;
                this.errorMessage = 'Server error. That\'s on us.';
            }

        });
    }
}

export const Login = {
	template: require('./login.html'),
	controller: LoginController
};
