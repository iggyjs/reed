export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true).hashPrefix('!');
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('app', {
			url: '/',
			redirectTo: 'home'
		})
		.state('home', {
			url: '/home',
			component: 'home',
			data: {
				authRequired: true
			}
		});
}
