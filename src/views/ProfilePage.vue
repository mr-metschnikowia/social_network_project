<template>
    <div id="main-profile">
    <profileMain 
        :profilePhoto="profilePhoto"
        :username="username"
        :about="about"
    />
    </div>
</template>

<script>
    import profileMain from "../components/profileMain"

    export default {
        name: "ProfilePage",
        components: {
            profileMain,
        },
        data() {
            return {
                profilePhoto: "",
                backgroundPhoto: "",
                username: "",
                about: "",
            }
        },
        methods: {
            getUserDeets() {
                this.profilePhoto = "https://play-lh.googleusercontent.com/i1qvljmS0nE43vtDhNKeGYtNlujcFxq72WAsyD2htUHOac57Z9Oiew0FrpGKlEehOvo=w240-h480-rw";
                this.username = "Bobby";
                this.about = "Hello my name is random Bobby!\nI like curry!";
            },
        },
        beforeMount() {
            this.getUserDeets();
        },
    }
</script>

<style scoped>
</style>