<template>
	<div id="myDropdown">
        <input id="search-bar" type="text" placeholder="Search for users.." v-model="query" @keyup="submitQuery">
		<div class="dropdown-content" :key="user.username" v-for="user in users">
			<dropDownItem
				:user="user"
			/>
		</div>
    </div>
</template>

<script>
	// for loop loops through array derived from parent view, using username as unique key of array elements
	// user input is bound to query variable in data 
	// the submitQuery function is triggered with each key press by the user 

	import dropDownItem from "./dropDownItem.vue";

	export default {
		name: "dropDownMenu",
		components: {
			dropDownItem,
		},
		data() {
			return {
				query: "",
			}
		},
	// query stores user input
		props: {
			users: Array,
		},
	// users array is obtained from database query
		methods: {
			submitQuery() {
				this.$emit("submit-query", this.query);
			}
			// as user inputs data into the search bar the submit query event is triggered containing data on the user's query
		}
	}
</script>

<style scoped>

#myDropdown {
	width: 700px;
	display: inline-block;
}

#search-bar {
	width: 100%;	
}

.dropdown-content {
	background-color: #f6f6f6;
	border: 1px solid #ddd;
	width: 100%;
}

</style>