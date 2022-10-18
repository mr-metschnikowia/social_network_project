<template>
    <div id="main-profile">
        <profileMain 
            :profilePhoto="profilePhoto"
            :username="username"
            :about="about"
            :backgroundPhoto="backgroundPhoto"
            :yourAccount ="yourAccount"
            :followerCount ="followerCount"
            @show-edit-profile-form="showEditProfileForm"
            @follow-user="followUser"
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
        props: {
            usernameProp: String,
        // recieves username information from other pages via this prop
        },
        data() {
            return {
                followerCount: 0,
                editProfile: false,
                profilePhoto: "",
                backgroundPhoto: "",
                username: "",
                about: "",
                yourAccount: false,
                // yourAccount is product of server-side user validation. The value of this variable will affect the edit profile UI.
            }
        },
        methods: {
            getFollowerCount() {
                const username = document.cookie.slice(document.cookie.indexOf("userProfile") + 12);
                fetch(`http://localhost:3000/api/getFollowerCount/${username}`, {
                    method: "GET",
                    headers: { "Authorization": document.cookie.slice(6) },
                })
                    .then(res => res.json())
                    .then(data => this.followerCount = data.followerCount)
            },
            followUser(userData) {
                fetch(`http://localhost:3000/api/followUser/${userData.username}`, {
                    method: "GET",
                    headers: { "Authorization": document.cookie.slice(6) },
                })
                    .then(res => res.text())
                    .then(text => alert(text))
            },
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
            createProfileCookie() {
                if (this.usernameProp != undefined) {
                    const cookie = document.cookie;
                    const endOfToken = cookie.indexOf("userProfile") > -1 ? cookie.indexOf("userProfile") : cookie.length;
                    document.cookie = document.cookie.slice(0,endOfToken) + `userProfile=${this.usernameProp}`;
                }
            }
            // function adds cookie relating to profile of interest
            // if the cookie already exists, it is replaced
            // cookie is only reset on first visit to particular profile, when usernameProp is not undefined
            ,
            async getUserDeets() {
                const username = document.cookie.slice(document.cookie.indexOf("userProfile") + 12);
                // get username of interest from cookie
                await fetch(`http://localhost:3000/api/getUserProfile/${username}`, {
                    method: "GET",
                    headers: { "Authorization": document.cookie },
                    // send cookie containing JWT web token in authorisation header 
                })
                    .then(res => res.json())
                    .then(data => {
                        this.profilePhoto = data.profilePhoto;
                        this.username = data.username;
                        this.about = data.about;
                        this.backgroundPhoto = data.backgroundPhoto;
                        this.yourAccount = data.yourAccount; 
                    })
                // fetch request to get profile detils of specific user from database using username prop
            },
        },
        beforeMount() {
            this.createProfileCookie();
            this.getUserDeets();
            this.getFollowerCount();
        },
    }
</script>