export function DashboardNavbarDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/dashboardNavbar/dashboard_navbar.html',
    scope: {
        creationDate: '='
    },
    controller: DashboardNavbarController,
    bindToController: true
  };

  return directive;
}

class DashboardNavbarController {
  constructor (moment) {
    'ngInject';
    console.log('Called');
  }

}
