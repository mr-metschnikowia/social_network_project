<template>
    <button @click="createNewPost">Create a new post</button>
</template>

<script>
    export default {
        name: "creatPostButton",
        methods: {
            createNewPost() {
                this.$emit("create-post");
            }
        },
    }
</script>

<style scoped>
    button {
        border: none;
        padding: 20px;
        background-color: darkgreen;
        color: white;
        border-radius: 15px;
        box-shadow: 0 0 8px rgb(207, 207, 207);
    }

    button:hover {
        border: none;
        padding: 15px;
        border-radius: 15px;
        box-shadow: inset 0 0 8px #f9f8fc;
    } 
</style>

