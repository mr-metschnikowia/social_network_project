<template>
    <div id="main-profile">
        <logoutButton class="logoutButton"/>
        <profileMain 
            :profilePhoto="profilePhoto"
            :username="username"
            :backgroundPhoto="backgroundPhoto"
            :yourAccount ="yourAccount"
            :followerCount ="followerCount"
            @show-edit-profile-form="showEditProfileForm"
            @follow-user="followUser"
        />
        <profileTabs
            :about="about"
            :following="following"
            :followers="followers"
        />
        <editProfileForm 
            @update-profile="updateProfile"
            @cancel-update-profile="cancelUpdateProfile"
            :style="{visibility: editProfile ? 'visible' : 'hidden'}" 
        />
    </div>
</template>

<script>
    import logoutButton from "../components/logoutButton";
    import profileMain from "../components/profileMain";
    import editProfileForm from "../components/editProfileForm";
    import profileTabs from "../components/profileTabs";

    export default {
        name: "ProfilePage",
        components: {
            profileMain,
            editProfileForm,
            profileTabs,
            logoutButton,
        },
        props: {
            usernameProp: String,
        // recieves username information from other pages via this prop
        },
        data() {
            return {
                following: [],
                followers: [],
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
            async getFollowers() {
                const username = document.cookie.slice(document.cookie.indexOf("userProfile") + 12);
                await fetch(`http://localhost:3000/api/getFollowers/${username}`, {
                    method: "GET",
                    headers: { "Authorization": document.cookie.slice(6) },
                })
                    .then(res => res.json())
                    .then(data => this.followers = data)
                // gets follower data from server
            },
            async getFollowing() {
                const username = document.cookie.slice(document.cookie.indexOf("userProfile") + 12);
                await fetch(`http://localhost:3000/api/getFollowing/${username}`, {
                    method: "GET",
                    headers: { "Authorization": document.cookie.slice(6) },
                })
                    .then(res => res.json())
                    .then(data => this.following = data)
                // gets data of users that profile follows
            },
            getFollowerCount() {
                const username = document.cookie.slice(document.cookie.indexOf("userProfile") + 12);
                fetch(`http://localhost:3000/api/getFollowerCount/${username}`, {
                    method: "GET",
                    headers: { "Authorization": document.cookie.slice(6) },
                })
                    .then(res => res.json())
                    .then(data => this.followerCount = data.followerCount)
                // gets follower count data from server
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
            cancelUpdateProfile() {
                this.editProfile = false; 
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
                    .catch(() => {
                        alert("Please login again!");
                        window.location.href = "http://localhost:8080/";
                        return false
                    })
                    // handle errors including jwt expiration error
                    .then(data => {
                        this.profilePhoto = data.profilePhoto;
                        this.username = data.username;
                        this.about = data.about;
                        this.backgroundPhoto = data.backgroundPhoto;
                        this.yourAccount = data.yourAccount; 
                    })
                // fetch request to get profile detils of specific user from database using username prop
            },
            getPageData() {
                this.createProfileCookie();
                this.getUserDeets();
                this.getFollowerCount();
                this.getFollowers();
                this.getFollowing();
            // gets all user data for profile page 
            },
        },
        watch: {
            $route() {
                this.getPageData();
            }
        },
        beforeMount() {
            this.getPageData();
        },
        // get page data on first visit
    }
</script>

<style scoped>
    .logoutButton {
        position: absolute;
        top: 0px;
        right: 10px;
        top: 90px;
    }
</style>
