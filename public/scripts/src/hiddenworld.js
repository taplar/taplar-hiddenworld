;'use strict';
var Hiddenworld = ( function ( $, window, document, undefined ) {
	var instance;
	
	var buildApi = function () {
		var $globalContainer = $( '.core-global-container', document.body )
			, $globalHeader = $globalContainer.find( '.core-header' )
			, $globalContent = $globalContainer.find( '.core-content' )
			, $overlay = $globalContainer.find( '.core-overlay' )
			, $spinner = $globalContainer.find( '.core-spinner' )
			, $welcome = $globalContent.find( '.welcome' )
			, $allMenus
			, $mainMenu
			, allTowns = {
				'1': 'Alzas'
				, '2': 'Altal'
				, '3': 'Bren'
				, '4': 'Brune Isle'
				, '5': 'Corollia'
				, '6': 'Dolence Isle'
				, '7': 'Elem'
				, '8': 'Fel'
				, '9': 'Feldar'
				, '10': 'Fodros'
				, '11': 'Komor'
				, '12': 'Lucrien'
				, '13': 'Luthien'
				, '14': 'Mogorva'
				, '15': 'Torvain'
				, '16': 'Wastelands'
				, '17': 'Zalta'
			};
		
		var variables = {
			templates: {}
		};
		
		var functions = {
			bindMainMenuAction: function () {
				$globalHeader.find( '.core-menu-link' ).on( 'touchend click', functions.openMainMenu );
			}
			, bindOverlayAction: function () {
				$overlay.on( 'touchend click', functions.closeOpenMenus );
			}
			, bindSubMenuAction: function () {
				$allMenus = $globalContainer.find( '.dialog.main-menu, .dialog.sub-menu' );
				
				$allMenus.filter( '.dialog.sub-menu' ).on( 'touchend click', '.menu-option', functions.processMenuOption );
			}
			, buildAccessoriesResultMap: function ( accessories ) {
				return accessories.reduce( function ( results, accessory, towns, properties ) {
					towns = accessory.towns;
					
					if ( towns.indexOf( 'Located in ' ) === 0 ) {
						towns = towns.slice( 11 );
					}
					
					properties = [
						{ class: 'level', numeric: 'numeric', value: accessory.level }
						, { class: 'name', numeric: '', value: accessory.name }
						, { class: 'element', numeric: '', value: accessory.element }
						, { class: 'effect', numeric: '', value: accessory.effect.split( /[,][ ]?/ ).join( '<br>' ) }
						, { class: 'location', numeric: '', value: towns.split( /[,][ ]?/ ).join( '<br>' ) }
					];
					
					results.push( { properties: properties } );
					
					return results;
				}, [] );
			}
			, buildArmoursResultMap: function ( armours ) {
				return armours.reduce( function ( results, armour, towns, properties ) {
					towns = armour.towns;
					
					if ( towns.indexOf( 'Located in ' ) === 0 ) {
						towns = towns.slice( 11 );
					}
					
					properties = [
						{ class: 'level', numeric: 'numeric', value: armour.level }
						, { class: 'name', numeric: '', value: armour.name }
						, { class: 'element', numeric: '', value: armour.element }
						, { class: 'absorb', numeric: 'numeric', value: armour.absorb }
						, { class: 'evade', numeric: 'numeric', value: armour.evade }
						, { class: 'location', numeric: '', value: towns.split( ', ' ).join( '<br>' ) }
					];
					
					results.push( { properties: properties } );
					
					return results;
				}, [] );
			}
			, buildDonationsResultMap: function ( donations ) {
				return donations.reduce( function ( results, donation, properties ) {
					properties = [
						{ class: 'level', numeric: 'numeric', value: donation.level }
						, { class: 'donation', numeric: 'numeric', value: donation.donation }
					];
					
					results.push( { properties: properties } );
					
					return results;
				}, [] );
			}
			, buildMenuOptions: function ( options ) {
				return options.map( function ( option, index ) {
					return { value: index + 1, label: option };
				} );
			}
			, buildMonstersResultMap: function ( monsters, selectedTown ) {
				return monsters.reduce( function ( results, monster, town, properties ) {
					if ( monster.place ) {
						town = monster.place;
					} else {
						town = selectedTown;
					}
					
					properties = [
						{ class: 'level', numeric: 'numeric', value: monster.level }
						, { class: 'name', numeric: '', value: monster.name }
						, { class: 'location', numeric: '', value: allTowns[ town ] }
					];
					
					results.push( { properties: properties } );
					
					return results;
				}, [] );
			}
			, buildPotionsResultMap: function ( potions ) {
				return potions.reduce( function ( results, potion, properties ) {
					properties = [
						{ class: 'level', numeric: 'numeric', value: potion.levelmin }
						, { class: 'name', numeric: '', value: potion.name }
						, { class: 'levelmax', numeric: 'numeric', value: potion.levelmax }
						, { class: 'effect', numeric: '', value: potion.effect }
					];
					
					results.push( { properties: properties } );
					
					return results;
				}, [] );
			}
			, buildWeaponsResultMap: function ( weapons ) {
				return weapons.reduce( function ( results, weapon, properties ) {
					properties = [
						{ class: 'level', numeric: 'numeric', value: weapon.level }
						, { class: 'name', numeric: '', value: weapon.name }
						, { class: 'element', numeric: '', value: weapon.element }
						, { class: 'damage', numeric: 'numeric', value: weapon.damage }
						, { class: 'location', numeric: '', value: weapon.towns.split( ', ' ).join( '<br>' ) }
					];
					
					results.push( { properties: properties } );
					
					return results;
				}, [] );
			}
			, clearPreviousResults: function () {
				$globalContent.find( '.result-container ' ).remove();
				$welcome.removeClass( 'core-hide' );
			}
			, closeOpenMenus: function () {
				if ( $spinner.hasClass( 'core-hide' ) ) {
					$allMenus.addClass( 'core-hide' );
					Core.getInstance().hideOverlay();
				}
			}
			, compileTemplates: function () {
				var $allScripts = $( 'script', document );
				
				$allScripts.filter( '.template' ).each( function ( index, element ) {
					variables.templates[ element.id ] = Handlebars.compile( element.innerHTML );
				} );
				
				$allScripts.detach();
			}
			, createAccessorySubMenu: function () {
				var accessorySubMenu = variables.templates[ 'submenu-template' ]( {
					subMenuType: 'accessory'
					, endpoint: 'attributes'
					, menuLabel: 'Accessory Attribute'
					, options: functions.buildMenuOptions( [
						'Absorb'
						, 'Charisma'
						, 'Constitution'
						, 'Dexterity'
						, 'Evade'
						, 'Health'
						, 'Hp Regen'
						, 'Intelligence'
						, 'Mana'
						, 'Speed'
						, 'Strength'
						, 'Wisdom'
					] )
				} );
				
				$globalContainer.append( accessorySubMenu );
			}
			, createCategorySubMenu: function () {
				var categorySubMenu = variables.templates[ 'submenu-template' ]( {
					subMenuType: 'category'
					, endpoint: 'categories'
					, menuLabel: 'Category'
					, options: functions.buildMenuOptions( [
						'Weapons'
						, 'Armours'
						, 'Accessories'
						, 'Potions'
						, 'Donations'
					] )
				} );
				
				$globalContainer.append( categorySubMenu );
			}
			, createLevelSubMenu: function () {
				var options = [];
				
				for ( var i = 1; i < 101; i++ ) {
					options.push( { value: i, label: ( i < 10 ? '0' : '' ) + i } );
				}
				
				var levelSubMenu = variables.templates[ 'submenu-template' ]( {
					subMenuType: 'level'
					, endpoint: 'levels'
					, menuLabel: 'Level Summary'
					, options: options
				} );
				
				$globalContainer.append( levelSubMenu );
			}
			, createMainMenu: function () {
				$mainMenu = $( variables.templates[ 'main-menu-template' ]( {
					menus: [
						{ submenu: 'category-menu', label: 'Category' }
						, { submenu: 'accessory-menu', label: 'Accessory Attribute' }
						, { submenu: 'weapon-menu', label: 'Weapon Type' }
						, { submenu: 'monster-menu', label: 'Monster Location' }
						, { submenu: 'level-menu', label: 'Level Summary' }
					]
				} ) );
				
				$mainMenu.on( 'touchend click', '.sub-menu a', functions.openSubMenu );
				$globalContainer.append( $mainMenu );
			}
			, createMonsterSubMenu: function () {
				var monsterSubMenu = variables.templates[ 'submenu-template' ]( {
					subMenuType: 'monster'
					, endpoint: 'towns'
					, menuLabel: 'Monster Location'
					, options: functions.buildMenuOptions( [
						'Alzas'
						, 'Altal'
						, 'Bren'
						, 'Brune'
						, 'Corollia'
						, 'Dolence Isle'
						, 'Elem'
						, 'Fel'
						, 'Feldar'
						, 'Fodros'
						, 'Komor'
						, 'Lucrien'
						, 'Luthien'
						, 'Mogorva'
						, 'Torvain'
						, 'Wastelands'
						, 'Zalta'
					] )
				} );
				
				$globalContainer.append( monsterSubMenu );
			}
			, createWeaponSubMenu: function () {
				var weaponSubMenu = variables.templates[ 'submenu-template' ]( {
			 		subMenuType: 'weapon'
					, endpoint: 'types'
					, menuLabel: 'Weapon Type'
					, options: [
						{ value: '4', label: 'Axe' }
						, { value: '2', label: 'Blade' }
						, { value: '10', label: 'Bow' }
						, { value: '7', label: 'Club' }
						, { value: '11', label: 'Crossbow' }
						, { value: '12', label: 'Halberd' }
						, { value: '8', label: 'Hammer' }
						, { value: '3', label: 'Knife' }
						, { value: '6', label: 'Knuckle' }
						, { value: '13', label: 'Lance' }
						, { value: '14', label: 'Pike' }
						, { value: '18', label: 'Projectile' }
						, { value: '17', label: 'Scythe' }
						, { value: '15', label: 'Spear' }
						, { value: '5', label: 'Staff' }
						, { value: '1', label: 'Sword' }
					]
				} );
				
				$globalContainer.append( weaponSubMenu );
			}
			, displayAccessories: function ( accessories ) {
				var accessories = variables.templates[ 'results-template' ]( {
					resultType: 'items'
					, resultLabel: 'Accessories'
					, resultLabels: [
						{ label: 'Lv' }
						, { label: 'Name' }
						, { label: 'Element' }
						, { label: 'Effect' }
						, { label: 'Location' }
					]
					, results: functions.buildAccessoriesResultMap( accessories )
				} );
				
				$globalContent.append( accessories );
			}
			, displayArmours: function ( armours ) {
				var armours = variables.templates[ 'results-template' ]( {
					resultType: 'armours'
					, resultLabel: 'Armours'
					, resultLabels: [
						{ label: 'Lv' }
						, { label: 'Name' }
						, { label: 'Element' }
						, { label: 'Absorb' }
						, { label: 'Evade<br>(%)' }
						, { label: 'Location' }
					]
					, results: functions.buildArmoursResultMap( armours )
				} );
				
				$globalContent.append( armours );
			}
			, displayDonations: function ( donations ) {
				var donations = variables.templates[ 'results-template' ]( {
					resultType: 'donations'
					, resultLabel: 'Donations'
					, resultLabels: [
						{ label: 'Lv' }
						, { label: 'Amount' }
					]
					, results: functions.buildDonationsResultMap( donations )
				} );
				
				$globalContent.append( donations );
			}
			, displayEndpoint: function ( endpoint, selectedValue ) {
				Core.getInstance().showSpinner();
				
				$.ajax( {
					url: 'api/equipment/'+ endpoint
					, dataType: 'json'
				} ).then( function ( data ) {
					functions.displayFilterResults( data, selectedValue );
				} ).always( function () {
					Core.getInstance().hideSpinner();
				} );
			}
			, displayFilterResults: function ( results, searchValue ) {
				$welcome.addClass( 'core-hide' );
				
				if ( results.donations ) functions.displayDonations( results.donations );
				if ( results.weapons ) functions.displayWeapons( results.weapons );
				if ( results.armours ) functions.displayArmours( results.armours );
				if ( results.accessories ) functions.displayAccessories( results.accessories );
				if ( results.potions ) functions.displayPotions( results.potions );
				if ( results.monsters ) functions.displayMonsters( results.monsters, searchValue );
			}
			, displayMonsters: function ( monsters, selectedTown ) {
				var monsters = variables.templates[ 'results-template' ]( {
					resultType: 'monsters'
					, resultLabel: 'Monsters'
					, resultLabels: [
						{ label: 'Lv' }
						, { label: 'Name' }
						, { label: 'Location' }
					]
					, results: functions.buildMonstersResultMap( monsters, selectedTown )
				} );
				
				$globalContent.append( monsters );
			}
			, displayPotions: function ( potions ) {
				var potions = variables.templates[ 'results-template' ]( {
					resultType: 'potions'
					, resultLabel: 'Potions'
					, resultLabels: [
						{ label: 'Lv' }
						, { label: 'Name' }
						, { label: 'Lv Max' }
						, { label: 'Effect' }
					]
					, results: functions.buildPotionsResultMap( potions )
				} );
				
				$globalContent.append( potions );
			}
			, displayWeapons: function ( weapons ) {
				var weapons = variables.templates[ 'results-template' ]( {
					  resultType: 'weapons'
					, resultLabel: 'Weapons'
					, resultLabels: [
						{ label: 'Lv' }
						, { label: 'Name' }
						, { label: 'Element' }
						, { label: 'Damage' }
						, { label: 'Location' }
					]
					, results: functions.buildWeaponsResultMap( weapons )
				} );
				
				$globalContent.append( weapons );
			}
			, openMainMenu: function ( e ) {
				e.preventDefault();
				
				if ( functions.touchEventEndedOnSameElement( e ) ) {
					functions.clearPreviousResults();
					functions.closeOpenMenus();
					Core.getInstance().showOverlay();
					$mainMenu.removeClass( 'core-hide' );
				}
			}
			, openSubMenu: function ( e ) {
				e.preventDefault();
				
				if ( functions.touchEventEndedOnSameElement( e ) ) {
					functions.closeOpenMenus();
					Core.getInstance().showOverlay();
					$allMenus.filter( '.'+ $( this ).data( 'submenu' ) ).removeClass( 'core-hide' );
				}
			}
			, processMenuOption: function ( e ) {
				e.preventDefault();
				
				if ( functions.touchEventEndedOnSameElement( e ) ) {
					functions.closeOpenMenus();
					
					var $option = $( this )
						, $menu = $option.closest( '.sub-menu' )
						, selectedValue = $option.data( 'value' )
						, endpoint = $menu.data( 'endpoint' ) +'/'+ selectedValue;
					
					functions.displayEndpoint( endpoint, selectedValue );
					history.pushState( { endpoint: endpoint, selectedValue: selectedValue }, document.title, document.location.href );
				}
			}
			, touchEventEndedOnSameElement: function ( e ) {
				if ( e.changedTouches ) {
					var touchStop = e.changedTouches[ 0 ]
						, lastElement = document.elementFromPoint( touchStop.clientX, touchStop.clientY );
					
					return ( e.target === lastElement );
				}
				
				return true;
			}
		};
		
		var api = {
			privateFunctions: functions
			, privateVariables: variables
			, initialize: function () {
				var initializationMethods = [
					'compileTemplates'
					, 'createMainMenu'
					, 'createCategorySubMenu'
					, 'createAccessorySubMenu'
					, 'createWeaponSubMenu'
					, 'createMonsterSubMenu'
					, 'createLevelSubMenu'
					, 'bindMainMenuAction'
					, 'bindSubMenuAction'
					, 'bindOverlayAction'
				];
				
				initializationMethods.forEach( function ( methodName ) {
					functions[ methodName ]();
					delete functions[ methodName ];
				} );
				
				delete instance.initialize;
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

Hiddenworld.getInstance().initialize();
