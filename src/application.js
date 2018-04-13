if ( 'serviceWorker' in navigator ) {
	window.addEventListener( 'load', () => {
		navigator.serviceWorker.register( './sw.js' );
	} );
}

import Vue from 'vue';
import VueResource from 'vue-resource';
import Application from './assets/javascripts/controllers/Application.vue';
import { dataModel } from './assets/javascripts/models/dataModel.js';

Vue.use( VueResource );

new Vue( {
	el: '#application'
	, components: { Application }
	, mounted () {
		let header = this.$children[ 0 ].$children[ 0 ].$el;
		let headerHeight = header.offsetHeight;

		( function hideCoreMenuIfRatioIsTooLarge () {
			if ( headerHeight / window.innerHeight >= 0.2 ) {
				header.classList.add( 'hide' );
			} else {
				header.classList.remove( 'hide' );
			}

			setTimeout( hideCoreMenuIfRatioIsTooLarge, 250 );
		} )();
	}
	, render: h => h( 'application' )
	, store: dataModel
} );
