<template>
    <div id="profilePhoto">
        <img :src="image"/>
        <h3>{{username}}</h3>
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
    img {
        height: 100px;
        width: 100px;
    }
</style>