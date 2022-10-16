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
            async updateProfile(newProfile) {
                await fetch("http://localhost:3000/api/updateMyProfile", {
                      method: "POST",
                      headers: { 'Content-type': 'application/json', "Authorization": document.cookie.slice(6) },
                      body: JSON.stringify(newProfile),
                })
                      .then(res => res.text())
                      .then(text => {
                          alert(text);
                          this.editProfile = false;
                          // remove edit profile form from page
                      })
                      // send new profile data to server
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