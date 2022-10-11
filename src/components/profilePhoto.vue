<template>
    <div id="profilePhoto">
        <img :src="image"/>
        <h3>{{username}}</h3>
        <router-link id="profile-link" to="/profile">View Profile</router-link>
    </div>
</template>

<script>

    export default {
        name: "profilePhoto",
        props: {
            image: String,
            username: String,
            // data that can be changed in the view based on client-server interaction
        },
    }

</script>

<style scoped>
    #profile-link {
        font-weight: bold;
        font-size: 15px;
        text-decoration: none;
        color: darkblue;
    }

    img {
        border-radius: 100px;
        height: 100px;
        width: 100px;
    }
</style>