<template>
	<div id="dropDownItem">
		<img class="dropDownItemComponent" :src="user.photo"/>
		<p class="dropDownItemComponent">{{user.username}}</p>
	</div>
</template>

<script>

		export default {
		name: "dropDownItem",
		props: {
			user: Object,
		},
	}
	// dropdown menu item component, user photo and user name are props which will be assigned values based on database query
</script>

<style scoped>
	.dropDownItemComponent {
		display: inline;
	}

	img {
        height: 50px;
        width: 50px;
		margin: 10px;
    }
</style>