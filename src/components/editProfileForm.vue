<template>
	<form id="edit-profile-form">
		<h3>Profile photo</h3>
		<input placeholder="url" class="form-input url" type="text" v-model="profilePhoto" />
		<h3>Background photo</h3>
		<input placeholder="url" class="form-input url" type="text" v-model="backgroundPhoto" />
		<h3>About</h3>
		<textarea id="about" class="form-input" v-model="about" />
		<button class="update-profile-button" @click="updateProfile">Update profile</button>
		<button class="cancel-update-profile-button" @click="cancelUpdateProfile">Cancel</button>
	</form>
</template>

<script>
	export default {
		name: "editProfileForm",
		data() {
			return {
				profilePhoto: "",
				backgroundPhoto: "",
				about: "",
			}
		},
		methods: {
			updateProfile () {
				const newProfile = {
					profilePhoto: this.profilePhoto,
					backgroundPhoto: this.backgroundPhoto,
					about: this.about,
				}
				
				this.$emit("update-profile", newProfile);
			},
			cancelUpdateProfile() {
				this.$emit("cancel-update-profile");
			},
		},
	}
</script>

<style scoped>
	#edit-profile-form {
		padding: 20px 30px 100px 20px;
        text-align: left;
        border: solid;
        width: 400px;
		height: 430px;
		background-color: white;
		position: relative;
		left: 650px;
		top: -300px;
	}

	.form-input {
        width: 100%;
    }

	.url {
        padding: 5px;
        height: 30px;
    }

    #about {
        height: 150px;
    }

    .update-profile-button {
        margin: 20px;
        padding: 15px;
        width: 120px;
        position: absolute;
        left: 290px;
    }

    .cancel-update-profile-button {
        margin: 20px;
        padding: 15px;
        width: 120px;
        position: absolute;
        left: 150px;
    }
</style>