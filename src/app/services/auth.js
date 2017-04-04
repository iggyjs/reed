/* eslint-disable */
export class AuthService {
	constructor($http) {
		this.$http = $http;
	}

	//TODO: handle api call for signup and login
	//as well as jwt storage
	signup(username, password) {
		let payload = {name: username, password: password};

		//execute post request to create a new user
		this.$http.post('http://localhost:8000/api/signup', payload)
		.then((res) => {
			let status = res.status;
			let success = res.data.success;

			if (status === 200 && success) {
				//store token
				console.log('User successfully created');
			} else {
				//handle err
				console.log('There was some error creating a user.');
			}
		});
	}

	login() {

	}

}
