<template>
	<section class="spinner">
		<input type="checkbox" class="state hide" :checked="checkboxValue">

		<label class="overlay" v-once>
			<i class="fa fa-spinner fa-pulse icon"></i>
		</label>
	</section>
</template>

<script>
	export default {
		computed: {
			checkboxValue () {
				return this.$store.getters.showSpinner;
			}
		}
	}
</script>
