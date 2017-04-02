/* eslint-disable */
class HomeController {
  constructor($http, $state) {
    this.message = 'Hello World!';
    this.$http = $http;


    //$state.current.data
    //$state.go('app')
  }
}

export const Home = {
  template: require('./Home.html'),
  controller: HomeController
};
