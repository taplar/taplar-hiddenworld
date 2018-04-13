<template>
	<nav class="sub-menu" v-once>
		<input type="radio" name="single-menu-state" class="hide menu-state" :id="submenu.type +'-menu'">

		<label for="no-menu" class="overlay">
			<label :for="submenu.type +'-menu'">
				<ul class="menu">
					<li class="title">
						<label :for="submenu.type +'-menu'">{{submenu.label}}</label>
					</li>

					<li class="menu-options">
						<span v-for="option in submenu.options" :key="option.label" v-if="option">
							<input type="checkbox" class="hide" :id="submenu.type +'-'+ option.label +'-state'" @change="search(submenu.type, option.value)">
							<label :for="submenu.type +'-'+ option.label +'-state'" class="option">{{option.label}}</label>
						</span>
					</li>
				</ul>
			</label>
		</label>
	</nav>
</template>

<script>
	export default {
		methods: {
			search ( type, value ) {
				let url = ( location.hostname === 'localhost1' ? 'http://hiddenworld.taplar.com/dev/' : '' ) +'api/equipment/'+ type +'/'+ value;

				this.$store.commit( 'selectedMenuValue', value );
				document.getElementById( 'no-menu' ).checked = true;
				this.$store.commit( 'enableSpinner' );
				this.$http.get( url ).then( this.searchSuccess, this.searchError );
			}
			, searchError () {
				this.$store.commit( 'disableSpinner' );
				this.$store.commit( 'searchResults', {} );
			}
			, searchSuccess ( response ) {
				this.$store.commit( 'disableSpinner' );
				this.$store.commit( 'searchResults', response.data );
			}
		}
		, props: [ 'submenu' ]
	}
</script>
