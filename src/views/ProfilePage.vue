<template>
    <div id="main-profile">
        <profileMain 
            :profilePhoto="profilePhoto"
            :username="username"
            :about="about"
            :backgroundPhoto="backgroundPhoto"
            @show-edit-profile-form="showEditProfileForm"
        />
        <editProfileForm 
            @update-profile="updateProfile"
            :style="{visibility: editProfile ? 'visible' : 'hidden'}" 
        />
    </div>
</template>

<script>
    import profileMain from "../components/profileMain"
    import editProfileForm from "../components/editProfileForm"

    export default {
        name: "ProfilePage",
        components: {
            profileMain,
            editProfileForm,
        },
        data() {
            return {
                editProfile: false,
                profilePhoto: "",
                backgroundPhoto: "",
                username: "",
                about: "",
            }
        },
        methods: {
            showEditProfileForm() {
                this.editProfile = true;
            },
            updateProfile() {
                this.editProfile = false;
                alert("updateProfile called successfully");
            },
            async getUserDeets() {
                await fetch(`http://localhost:3000/api/getMyProfile`, {
                    method: "GET",
                    headers: { "Authorization": document.cookie.slice(6) },
                })
                    .then(res => res.json())
                    .then(data => {
                        this.profilePhoto = data.profilePhoto;
                        this.username = data.username;
                        this.about = data.about;
                        this.backgroundPhoto = data.backgroundPhoto;
                    })
                // fetch request to get profile detils of specific user from database
                // where to get username from?
            },
        },
        beforeMount() {
            this.getUserDeets();
        },
    }
</script>