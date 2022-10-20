<template>
    <div :key="post.title" v-for="post in feed">
        <userPost :post="post"/>
    </div>
</template>

<script>
    import userPost from "./userPost";

    export default {
        name: "homeFeed",
        components: {
            userPost
        },
        props: {
            feed: Array,
        }
    }
</script>

<style>
</style>