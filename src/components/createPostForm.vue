<template>
    <form id="createPostForm">
        <h3>Post Title</h3>
        <input type="text" v-model="postTitle" />
        <h3>Post Content</h3>
        <input id="post-content" type="text" v-model="postContent" />
        <button @click="submitPost">Submit Post</button>
    </form>
</template>

<script>
    export default {
        name: "createPostForm",
        data() {
            return {
                postTitle: "",
                postContent: "",
            }
        },
        methods: {
            submitPost() {
                this.$emit("submit-post");
            }
        }
    }
</script>

<style scoped>
    #createPostForm {
        position: relative;
        padding: 20px 30px 100px 20px;
        text-align: left;
        border: solid;
        width: 700px;
    }

    input {
        width: 100%;
        height: 30px;
    }

    button {
        position: absolute;
        margin: 20px;
        padding: 15px;
        width: 120px;
        left: 590px;
    }

    #post-content {
        height: 150px;
    }
</style>