import angular from 'angular';
// import {TodoService} from './app/todos/todos';
// import containers here
import {Home} from './app/states/home/home';

import 'angular-ui-router';
import 'angular-jwt';

import routesConfig from './routes';

import './index.css';

angular
  .module('app', ['ui.router', 'angular-jwt'])
  .config(routesConfig)
  .component('home', Home);
