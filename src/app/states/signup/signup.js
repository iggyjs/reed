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

        let user = this.Auth.validateUserToken()
        if (user) {
            this.$state.go('dashboard');
        }
	}

    signup(e) {
        e.preventDefault();

        this.Auth.signup(this.username, this.password);

        //TODO: Ensure that usernames are unique

        //FIXME: Uncomment when you're done testing APIs
        // check if form is valid
        // let passwordsMatch = this.password === this.password2 ? true : false;
        // let usernameIsLongEnough = this.username.length > 3 ? true : false
        // let usernameIsShortEnough = this.username.length < 25 ? true : false
        // let passwordIsLongEnough = this.password.length > 6 ? true : false;
        //
        // if (passwordsMatch && usernameIsLongEnough && usernameIsShortEnough && passwordIsLongEnough) {
        //     this.Auth.signup(this.username, this.password);
        // }
        // else {
        //     if (this.password.length === 0) {
        //         //show password too short message
        //     }
        //
        //     if (!usernameIsLongEnough) {
        //         //show username too short message
        //     }
        //
        //     if (!usernameIsShortEnough) {
        //         //show username too long message
        //     }
        //
        //     if (!passwordsMatch) {
        //         //show passwords do not match message
        //     }
        // }
    }
}

export const Signup = {
	template: require('./signup.html'),
	controller: SignupController
};
