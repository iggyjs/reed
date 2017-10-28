import angular from 'angular';

// states
import {Landing} from './app/states/landing/landing';
import {Dashboard} from './app/states/dashboard/dashboard';
import {Notifications} from './app/states/notifications/notifications';
import {Login} from './app/states/login/login';
import {Logout} from './app/states/logout/logout';
import {Signup} from './app/states/signup/signup';
import {Search} from './app/states/search/search';
import {Profile} from './app/states/profile/profile';
import {NotFound} from './app/states/notFound/notFound';
import {TempHome} from './app/states/tempHome/tempHome';

// services
import {AuthService} from './app/services/auth.js';

//node_modules
import 'angular-ui-router';
import 'angular-jwt';

import routesConfig from './routes';

import './index.css';

angular
  .module('app', ['ui.router', 'angular-jwt'])
  .config(routesConfig)
  .component('landing', Landing)
  .component('dashboard', Dashboard)
  .component('notifications', Notifications)
  .component('login', Login)
  .component('signup', Signup)
  .component('search', Search)
  .component('profile', Profile)
  .component('logout', Logout)
  .component('notFound', NotFound)
  .component('tempHome', TempHome)
  .service('Auth', AuthService);
