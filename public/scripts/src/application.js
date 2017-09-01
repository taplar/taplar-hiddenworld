import Vue from 'vue';
import VueResource from 'vue-resource-2';
import Application from './controllers/application/Application.vue';
import { dataModel } from './dataModel.js';

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
