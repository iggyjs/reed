/* eslint-disable */
const config = require('../../config');
const SERVER = config.environment === 'DEV' ? config.development_server : config.production_server;

/** @ngInject */
class SignupController {
  	constructor($http, $state, Auth) {
		this.$state = $state;
        this.username = '';
        this.password = '';
        this.password2 = '';
        this.Auth = Auth;
		this.data = $state.current.data;
		this.$http = $http;

        this.error = false;
        this.errorMessage = '';

        let user = this.Auth.getUserToken();

        if (user) {
            //we have some token
            // try redirecting to dashboard
            //will send returning users to the login screen
            this.Auth.validateUserToken();
        }
	}

    signup(e) {
        e.preventDefault();

        // check if form is valid
        let passwordsMatch = this.password === this.password2 ? true : false;
        let usernameIsLongEnough = this.username.length > 2 ? true : false
        let usernameIsShortEnough = this.username.length < 25 ? true : false
        let passwordIsLongEnough = this.password.length > 6 ? true : false;

        if (passwordsMatch && usernameIsLongEnough && usernameIsShortEnough && passwordIsLongEnough) {
            this.AuthSignup(this.username, this.password);
        }
        else {
            if (this.password.length === 0) {
                //show password too short message
                this.error = true;
                this.errorMessage = 'Password is too short.';
            }

            if (!usernameIsLongEnough) {
                //show username too short message
                this.error = true;
                this.errorMessage = 'Username must be more than 2 characters.';
            }

            if (!usernameIsShortEnough) {
                //show username too long message
                this.error = true;
                this.errorMessage = 'Way too long.';
            }

            if (!passwordsMatch) {
                //show passwords do not match message
                this.error = true;
                this.errorMessage = 'Passwords don\'t match.';
            }

            if (!passwordIsLongEnough) {
                this.error = true;
                this.errorMessage = 'Password needs to be at least 6 characters.';
            }
        }
    }

    // Moved out of service to handle errors
    AuthSignup(username, password) {
        let payload = {name: username, password: password};

        //execute post request to create a new user
        this.$http.post(SERVER + '/api/signup', payload)
        .then((res) => {
            let status = res.status;
            let success = res.data.success;
            let token = res.data.token;

            if (status === 200 && success) {
                //store token
                localStorage.setItem('reed-token', token);
                // go to dash
                this.$state.go('dashboard');
            } else {
                //handle err
                this.error = true;
                this.errorMessage = res.data.message;
            }
        });
    }

}

export const Signup = {
	template: require('./signup.html'),
	controller: SignupController
};
