<template>
	<header class="header">
		<span class="home">
			<a href="//www.taplar.com">
				<i class="fa fa-home icon" alt="Home" title="Home"></i>
			</a>
		</span>

		<h3 class="title">Hiddenworld</h3>

		<span class="main-menu">
			<label for="main-menu" @click="clearSearchResults()">
				<input type="radio" name="single-menu-state" class="hide" id="no-menu" checked="checked">
				<i class="fa fa-bars icon" alt="Home" title="Main Menu"></i>
			</label>
		</span>
	</header>
</template>

<script>
	export default {
		methods: {
			clearSearchResults () {
				this.$store.commit( 'clearSearchResults' );
			}
		}
	}
</script>
