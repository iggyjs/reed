export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true).hashPrefix('!');
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('app', {
			url: '/',
			redirectTo: 'tempHome'
		})
		.state('dashboard', {
			url: '/dashboard',
			component: 'dashboard',
			data: {
				authRequired: true
			}
		}).state('login', {
			url: '/login',
			component: 'login',
			data: {
				authRequired: false
			}
		}).state('logout', {
			url: '/logout',
			component: 'logout',
			data: {
				authRequired: false
			}
		}).state('signup', {
			url: '/signup',
			component: 'signup',
			data: {
				authRequired: false
			}
		}).state('search', {
			url: '/search',
			component: 'search',
			data: {
				authRequired: true
			}
		}).state('notFound', {
			url: '/404',
			component: 'notFound',
			data: {
				authRequired: false
			}
		}).state('tempHome', {
			url: '/tempHome',
			component: 'tempHome',
			data: {
				authRequired: false
			}
		}).state('profile', {
			url: '/:userId',
			component: 'profile',
			data: {
				authRequired: true
			}
		});

		//variable route needs to be last
}