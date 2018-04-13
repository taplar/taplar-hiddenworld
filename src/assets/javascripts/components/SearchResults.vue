<template>
	<section class="content" v-if="data.results.length">
		  <div class="search-results-container"> 
			 <h4 class="title">{{data.title}}</h4>
			
			  <table class="search-results-table"> 
				  <thead> 
					 <tr> 
						 <th v-for="column in data.columns" :key="column.label">{{column.label}}</th>
					 </tr> 
				 </thead>  
				
				 <tbody> 
					 <tr v-for="(result, index) in data.results" :key="index">
						<td v-for="column in data.columns" :key="column.key" :class="generateClasses(column.key)" v-html="result[column.key]"></td>
					 </tr> 
				 </tbody> 
			 </table>  
		</div> 
	</section>
</template>

<script>
	export default {
		methods: {
			generateClasses ( columnKey ) {
				var result = columnKey;

				if ( [ 'level', 'damage', 'absorb', 'evade', 'levelmin', 'levelmax', 'gold' ].indexOf( columnKey ) + 1 ) result += ' numeric';

				return result;
			}
		}
		, props: [ 'data' ]
	}
</script>
