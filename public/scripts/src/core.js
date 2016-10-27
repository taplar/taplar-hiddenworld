;'use strict';
var Core = ( function ( $, window, document, undefined ) {
	var instance;
	
	var buildApi = function () {
		var $window = $( window )
			, $coreContainer = $( '.core-global-container', document.body )
			, $coreHeader = $( '.core-header', document.body )
			, $overlay = $( '.core-overlay', document.body )
			, $spinner = $( '.core-spinner', document.body );
		
		var variables = {
			startScrollPosition: 0
			, startScrollTime: 0
		};
		
		var functions = {
			hideCoreMenu: function ( currentScrollPosition, currentScrollTime ) {
				$coreHeader.addClass( 'core-scroll-up' );
				
				variables.startScrollPosition = currentScrollPosition;
				variables.startScrollTime = currentScrollTime;
			}
			, hideCoreMenuIfRatioIsTooLarge: function () {
				if ( $coreHeader.height() / window.innerHeight >= 0.2 ) {
					$coreHeader.addClass( 'core-hide' );
				} else {
					$coreHeader.removeClass( 'core-hide' );
				}
				
				setTimeout( functions.hideCoreMenuIfRatioIsTooLarge, 250 );
			}
			, showCoreMenu: function ( currentScrollPosition, currentScrollTime ) {
				$coreHeader.removeClass( 'core-scroll-up' );
				
				variables.startScrollPosition = currentScrollPosition;
				variables.startScrollTime = currentScrollTime;
			}
			, toggleCoreMenuOnScroll: function () {
				var currentScrollTime = Date.now()
					, currentScrollPosition = $coreContainer.scrollTop();
				
				if ( currentScrollPosition > $coreHeader.height() ) {
					if ( currentScrollPosition > variables.startScrollPosition ) {
						functions.hideCoreMenu( currentScrollPosition, currentScrollTime );
					} else if ( variables.startScrollPosition - currentScrollPosition > 100 ) {
						functions.showCoreMenu( currentScrollPosition, currentScrollTime );
					}
				} else {
					functions.showCoreMenu( currentScrollPosition, currentScrollTime );
				}
				
				$coreContainer.one( 'scroll', functions.toggleCoreMenuOnScroll );
			}
		};
		
		var api = {
			privateFunctions: functions
			, privateVariables: variables
			, hideSpinner: function () {
				$spinner.addClass( 'core-hide' );
				$overlay.addClass( 'core-hide' );
				
				return instance;
			}
			, hideOverlay: function () {
				$overlay.addClass( 'core-hide' );
				
				return instance;
			}
			, initialize: function () {
				functions.toggleCoreMenuOnScroll();
				functions.hideCoreMenuIfRatioIsTooLarge();
				
				delete instance.initialize;
				
				return instance;
			}
			, showOverlay: function () {
				$overlay.removeClass( 'core-hide' );
				
				return instance;
			}
			, showSpinner: function () {
				$overlay.removeClass( 'core-hide' );
				$spinner.removeClass( 'core-hide' );
				
				return instance;
			}
		};
		
		return api;
	};
	
	return {
		getInstance: function () {
			if ( !instance ) {
				instance = buildApi();
				
				delete instance.privateFunctions;
				delete instance.privateVariables;
			}
			
			return instance;
		}
		, getTestInstance: buildApi
	};
}( jQuery, window, document ) );

Core.getInstance().initialize();
