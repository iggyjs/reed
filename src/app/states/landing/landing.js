/* eslint-disable */
const config = require('../../config');
const SERVER = config.environment === 'DEV' ? config.development_server : config.production_server;

/** @ngInject */
class LandingController {
  	constructor($http, $state, Auth) {
		this.$state = $state;
        this.Auth = Auth;
        this.bannerFourBackgroundChanged = false;
        this.alterUI();

        $(window).resize(() => {
            this.alterUI();
        });

        let token = this.Auth.getUserToken();

        if (token) {
            //we have some token
            // try redirecting to dashboard
            //will send returning users to the login screen
            let user = this.Auth.validateUserToken();
            if (user) {
                this.$state.go('dashboard');
            }
        }
	}


    alterUI() {
        let bannerOneHeight = window.innerHeight - 71;

        // banner 1
        $('#bannerOne').css('height', bannerOneHeight + 'px');
        $('#bannerOne').css('width', window.innerWidth + 'px');
        $('#firstContainer').css('padding-top', (bannerOneHeight - $('#firstContainer').height())/3);

        // banner two
        $('#bannerTwo').css('width', window.innerWidth + 'px');
        $('#bannerTwo').css('height', window.innerHeight + 'px');
        $('#secondContainer').css('padding-top', (window.innerHeight - $('#secondContainer').height())/3);


        //banner three
        $('#bannerThree').css('width', window.innerWidth + 'px');
        $('#bannerThree').css('height', window.innerHeight + 'px');
        $('#thirdContainer').css('padding-top', (window.innerHeight - $('#thirdContainer').height())/3);

        //banner four
        $('#bannerFour').css('width', window.innerWidth + 'px');
        $('#bannerFour').css('height', window.innerHeight + 'px');
        $('#fourthContainer').css('padding-top', (window.innerHeight - $('#fourthContainer').height())/3);

        $(window).scroll(function() {
            var hT = $('#fourthContainer').offset().top,
            hH = $('#fourthContainer').outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();

            if (wS > (hT+hH-wH)){
                if (!this.bannerFourBackgroundChanged) {
                    // execute only once
                    $('#bannerFour').css('background-color', '#4E56EE');

                    this.bannerFourBackgroundChanged = true;
                }
            }
        });
    }
}

export const Landing = {
	template: require('./landing.html'),
	controller: LandingController
};
