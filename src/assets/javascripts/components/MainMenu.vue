<template>
	<nav class="main-menu" v-once>
		<input type="radio" name="single-menu-state" class="menu-state hide" id="main-menu">

		<label for="no-menu" class="overlay">
			<ul class="menu">
				<li class="title">
					<label for="main-menu">Filter On</label>
				</li>

				<li v-for="menu in menus" :key="menu.submenu">
					<label :for="menu.submenu" class="link">
						{{menu.label}}
						<i class="fa fa-arrow-circle-right icon"></i>
					</label>
				</li>
			</ul>
		</label>
	</nav>
</template>

<script>
	export default {
		data () {
			return {
				menus: [
					{ submenu: 'categories-menu', label: 'Category' }
					, { submenu: 'attributes-menu', label: 'Accessory Attribute' }
					, { submenu: 'types-menu', label: 'Weapon Type' }
					, { submenu: 'towns-menu', label: 'Monster Location' }
					, { submenu: 'levels-menu', label: 'Level Summary' }
				]
			}
		}
	}
</script>
