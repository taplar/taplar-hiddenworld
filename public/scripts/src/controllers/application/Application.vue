<template>
	<div class="application" @scroll="hideHeaderIfScrollingDown">
		<application-header></application-header>
		<application-body></application-body>
		<spinner></spinner>
		<main-menu></main-menu>
		<sub-menu v-for="submenu in submenus" :submenu="submenu"></sub-menu>
	</div>
</template>

<script>
	import ApplicationHeader from './components/Header.vue';
	import ApplicationBody from './components/Body.vue';
	import MainMenu from './components/MainMenu.vue';
	import SubMenu from './components/SubMenu.vue';
	import Spinner from './components/Spinner.vue';


	export default {
		components: {
			ApplicationHeader
			, ApplicationBody
			, MainMenu
			, SubMenu
			, Spinner
		}
		, data () {
			return {
				submenus: [
					{
						type: 'attributes'
						, label: 'Accessory Attribute'
						, options: [
							{ label: 'Absorb', value: '1' }
							, { label: 'Charisma', value: '2' }
							, { label: 'Constitution', value: '3' }
							, { label: 'Dexterity', value: '4' }
							, { label: 'Evade', value: '5' }
							, { label: 'Health', value: '6' }
							, { label: 'Hp Regen', value: '7' }
							, { label: 'Intelligence', value: '8' }
							, { label: 'Mana', value: '9' }
							, { label: 'Speed', value: '10' }
							, { label: 'Strength', value: '11' }
							, { label: 'Wisdom', value: '12' }
						]
					}
					, {
						type: 'categories'
						, label: 'Category'
						, options: [
							, { label: 'Weapons', value: '1' }
							, { label: 'Armours', value: '2' }
							, { label: 'Accessories', value: '3' }
							, { label: 'Potions', value: '4' }
							, { label: 'Donations', value: '5' }
						]
					}
					, {
						type: 'levels'
						, label: 'Level Summary'
						, options: new Array( 100 ).fill(1).map( ( element, index ) => {
							let value = ++index;
							let label = ( value < 10 ? '0' : '' ) + value.toString();

							return { label: label, value: value };
						} )
					}
					, {
						type: 'towns'
						, label: 'Monster Location'
						, options: [
							{ label: 'Alzas', value: '1' }
							, { label: 'Altal', value: '2' }
							, { label: 'Bren', value: '3' }
							, { label: 'Brune', value: '4' }
							, { label: 'Corollia', value: '5' }
							, { label: 'Dolence Isle', value: '6' }
							, { label: 'Elem', value: '7' }
							, { label: 'Fel', value: '8' }
							, { label: 'Feldar', value: '9' }
							, { label: 'Fodros', value: '10' }
							, { label: 'Komor', value: '11' }
							, { label: 'Lucrien', value: '12' }
							, { label: 'Luthien', value: '13' }
							, { label: 'Mogorva', value: '14' }
							, { label: 'Torvain', value: '15' }
							, { label: 'Wastelands', value: '16' }
							, { label: 'Zalta', value: '17' }
						]
					}
					, {
						type: 'types'
						, label: 'Weapon Type'
						, options: [
							{ label: 'Axe', value: '4' }
							, { label: 'Blade', value: '2' }
							, { label: 'Bow', value: '10' }
							, { label: 'Club', value: '7' }
							, { label: 'Crossbow', value: '11' }
							, { label: 'Halberd', value: '12' }
							, { label: 'Hammer', value: '8' }
							, { label: 'Knife', value: '3' }
							, { label: 'Knuckle', value: '6' }
							, { label: 'Lance', value: '13' }
							, { label: 'Pike', value: '14' }
							, { label: 'Projectile', value: '18' }
							, { label: 'Scythe', value: '17' }
							, { label: 'Spear', value: '15' }
							, { label: 'Staff', value: '5' }
							, { label: 'Sword', value: '1' }
						]
					}
				]
			}
		}
		, methods: {
			hideHeaderIfScrollingDown ( event ) {
				if ( !this.throttleScroll ) {
					this.throttleScroll = true;
					var application = this.$el;
					var verticalScroll = application.scrollTop;
					this.scrollPositionStart = verticalScroll;
					
					setTimeout( () => {
						var header = this.$children[ 0 ].$el;
						var headerHeight = header.offsetHeight;

						if ( verticalScroll <= headerHeight ) {
							header.classList.remove( 'slideUp' );
						} else if ( application.scrollTop > this.scrollPositionStart ) {
							header.classList.add( 'slideUp' );
						} else {
							header.classList.remove( 'slideUp' );
						}

						this.throttleScroll = false;
					}, 300 );
				}
			}
		}
	}
</script>
