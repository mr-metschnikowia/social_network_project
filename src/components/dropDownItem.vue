<template>
	<div @click="toProfilePage" id="dropDownItem">
		<img class="dropDownItemComponent profilePhoto" :src="user.photo"/>
		<p class="dropDownItemComponent">{{user.username}}</p>
	</div>
</template>

<script>

		export default {
		name: "dropDownItem",
		props: {
			user: Object,
		},
		methods: {
			toProfilePage() {
				window.location.href = "http://localhost:8080/profile";
				// click on dropdown menu item to be redirected to profile page
			},
		}
	}
	// dropdown menu item component, user photo and user name are props which will be assigned values based on database query
</script>

<style scoped>
	#dropDownItem {
		position: relative;
		align-content: left;
		padding: 40px;
	}

	.dropDownItemComponent {
		display: inline;
	}

	p {
		position: absolute;
		bottom: 15px;
		left: 150px;
	}

	.profilePhoto {
        height: 50px;
        width: 50px;
		margin: 10px;
		position: absolute;
		bottom: 5px;
		left: 30px;
    }
</style>