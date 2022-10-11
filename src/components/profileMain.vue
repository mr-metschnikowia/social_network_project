<template>
    <div id="cool-div">
        <img id="profile-photo" :src="profilePhoto" />
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
        }
    }
</script>

<style scoped>
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
        background-image: url('https://wallpapers.com/images/hd/nature-landscape-go05oyj577mpbz7b.jpg');
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