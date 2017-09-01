<template>
	<span>
		<section class="content">
			<div class="welcome" v-show="searchResultsDoNotExist">
				<h4 class="title">Equipment Guide</h4>

				<p class="comment">Herein you can find almost anything you want to know about the equipment and items of Hiddenworld.  Please give a big thanks to Gandalf who provided the information.</p>
				<p class="comment">Please use the <i class="fa fa-bars icon"> menu</i> above to select your filter.</p>
			</div>
		</section>

		<search-results :data="donationData"></search-results>
		<search-results :data="weaponData"></search-results>
		<search-results :data="armourData"></search-results>
		<search-results :data="accessoryData"></search-results>
		<search-results :data="potionData"></search-results>
		<search-results :data="monsterData"></search-results>
	</span>
</template>

<script>
	import SearchResults from './SearchResults.vue';

	export default {
		components: { SearchResults }
		, computed: {
			accessoryData () {
				return {
					title: 'Accessories'
					, columns: [
						{ key: 'level', label: 'Lv' }
						, { key: 'name', label: 'Name' }
						, { key: 'element', label: 'Element' }
						, { key: 'effect', label: 'Effect' }
						, { key: 'towns', label: 'Location' }
					]
					, results: this.$store.getters.accessories
				}
			}
			, armourData () {
				return {
					title: 'Armours'
					, columns: [
						{ key: 'level', label: 'Lv' }
						, { key: 'name', label: 'Name' }
						, { key: 'element', label: 'Element' }
						, { key: 'absorb', label: 'Absorb' }
						, { key: 'evade', label: 'Evade (%)' }
						, { key: 'towns', label: 'Location' }
					]
					, results: this.$store.getters.armours
				}
			}
			, donationData () {
				return {
					title: 'Donations'
					, columns: [
						{ key: 'level', label: 'Lv' }
						, { key: 'donation', label: 'Amount' }
					]
					, results: this.$store.getters.donations
				}
			}
			, monsterData () {
				return {
					title: 'Monsters'
					, columns: [
						{ key: 'level', label: 'Lv' }
						, { key: 'name', label: 'Name' }
						, { key: 'towns', label: 'Location' }
					]
					, results: this.$store.getters.monsters
				}
			}
			, potionData () {
				return {
					title: 'Potions'
					, columns: [
						{ key: 'levelmin', label: 'Lv' }
						, { key: 'name', label: 'Name' }
						, { key: 'levelmax', label: 'Lv Max' }
						, { key: 'effect', label: 'Effect' }
					]
					, results: this.$store.getters.potions
				}
			}
			, searchResultsDoNotExist () {
				return !this.$store.getters.searchResultsExist;
			}
			, weaponData () {
				return {
					title: 'Weapons'
					, columns: [
						{ key: 'level', label: 'Lv' }
						, { key: 'name', label: 'Name' }
						, { key: 'element', label: 'Element' }
						, { key: 'damage', label: 'Damage' }
						, { key: 'towns', label: 'Location' }
					]
					, results: this.$store.getters.weapons
				}
			}
		}
	}
</script>
