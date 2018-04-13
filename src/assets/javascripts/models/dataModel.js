import Vue from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

export const dataModel = new Vuex.Store( {
	state: {
		accessories: []
		, armours: []
		, donations: []
		, monsters: []
		, potions: []
		, selectedMenuValue: 0
		, showSpinner: false
		, weapons: []
	}
	, getters: {
		accessories: state => state.accessories
		, armours: state => state.armours
		, donations: state => state.donations
		, monsters: state => {
			let towns = [
				''
				, 'Alzas'
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
			];

			return state.monsters.map( monster => {
				return {
					level: monster.level
					, name: monster.name
					, towns: towns[ monster.place ]
				};
			} );
		}
		, potions: state => state.potions
		, searchResultsExist: state => state.weapons.length || state.armours.length || state.accessories.length || state.potions.length || state.donations.length || state.monsters.length
		, selectedMenuValue: state => state.selectedMenuValue
		, showSpinner: state => state.showSpinner
		, weapons: state => state.weapons
	}
	, mutations: {
		clearSearchResults: state => {
			state.weapons.splice( 0 );
			state.armours.splice( 0 );
			state.accessories.splice( 0 );
			state.potions.splice( 0 );
			state.donations.splice( 0 );
			state.monsters.splice( 0 );
		}
		, disableSpinner: state => state.showSpinner = false
		, enableSpinner: state => state.showSpinner = true
		, searchResults: (state, value) => {
			function formatTowns ( towns ) {
				return towns.join( '<br>' );
			}

			if ( value.weapons ) {
				value.weapons.forEach( weapon => {
					weapon.towns = formatTowns( weapon.towns );

					state.weapons.push( weapon );
				} );
			}

			if ( value.armours ) {
				value.armours.forEach( armour => {
					armour.towns = formatTowns( armour.towns );

					state.armours.push( armour );
				} );
			}

			if ( value.accessories ) {
				value.accessories.forEach( accessory => {
					accessory.towns = formatTowns( accessory.towns );

					state.accessories.push( accessory );
				} );
			}

			if ( value.potions ) value.potions.forEach( potion => state.potions.push( potion ) );
			if ( value.donations ) value.donations.forEach( donation => state.donations.push( donation ) );

			if ( value.monsters ) {
				value.monsters.forEach( monster => {
					if ( !monster.place ) monster.place = state.selectedMenuValue;
					
					state.monsters.push( monster );
				} );
			}
		}
		, selectedMenuValue: ( state, value ) => state.selectedMenuValue = value
	}
} );
