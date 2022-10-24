<template>
	<div id="dropDownItem">
		<img class="dropDownItemComponent profilePhoto" :src="user.photo" />
		<router-link 
			:to="{ name: 'ProfilePage', params: { usernameProp: user.username }}"
			class="dropDownItemComponent">
			{{user.username}}
		</router-link>
		<!--username is sent to profile page through router link-->
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