<template>
    <div id="cool-div" v-bind:style="{ backgroundImage: 'url(' + backgroundPhoto + ')' }">
        <img id="profile-photo" :src="profilePhoto" />
        <img 
            :style="{visibility: yourAccount ? 'visible' : 'hidden'}"
            id="edit-profile-icon" 
            @click="showEditProfileForm" 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBUrbYkAXIGvMURWnUldPEUbRHrmOV14Yj84gc93PcSSAfbO99iQP1R9SxbZZHnaV9mb4&usqp=CAU"
        />
        <h3 id="user-label">{{username}}</h3>
    </div>
    <div id="about-div">
        <h3 id="about-title">About</h3>
        <p id="about-content">{{about}}</p>
    </div>
</template>

<script>
    export default {
        name: "profileMain",
        props: {
            profilePhoto: String,
            backgroundPhoto: String,
            username: String,
            about: String,
            yourAccount: Boolean,
            // only show edit profile UI if account is of logged in user
        },
        methods: {
            showEditProfileForm() {
                this.$emit("show-edit-profile-form");
            }
        },
    }
</script>

<style scoped>
    #edit-profile-icon {
        border-radius: 100%;
        height: 30px;
        width: 30px;
        position: absolute;
        top: 192px;
        left: 920px;
        border: solid 2px white;
    }

    #about-div {
        position: relative;
    }

    #about-title {
        position: absolute;
        left: 100px;
        top: 30px;
        font-size: 50px;
    }

    #about-content {
        font-weight: bold;
        position: absolute;
        left: 100px;
        top: 200px;
    }

    #cool-div {
        position: relative;
        height: 400px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    #user-label {
        position: absolute;
        left: 810px;
        top: 360px;
        background-color: darkred;
        width: 150px;
        padding: 8px;
        color: white;
        border-radius: 20px;
    }

    #profile-photo {
        position: absolute;
        left: 800px;
        top: 198px;
        height: 175px;
        width: 175px;
        border-radius: 100%;
        border: 5px solid darkred;
    }
</style>