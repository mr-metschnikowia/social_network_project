<template>
    <form id="createPostForm">
        <h3>Post Title</h3>
        <input id="post-title" class="form-input" type="text" v-model="postTitle" />
        <h3>Post Content</h3>
        <textarea id="post-content" class="form-input" type="text" v-model="postContent" />
        <button class="submit-post-button" @click="submitPost">Submit Post</button>
        <button class="cancel-create-post-button" @click="cancelCreatePost">Cancel</button>
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
                const today = new Date();
                const day = String(today.getDate());
                const month = String(today.getMonth() + 1);
                const year = String(today.getFullYear());
                const formattedDate = `${day}/${month}/${year}`;
                // calculate today's date 
                this.$emit("submit-post", { title: this.postTitle, content: this.postContent, date: formattedDate });
            },
            cancelCreatePost() {
                this.$emit("cancel-create-post");
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

    .form-input {
        width: 100%;
    }

    .submit-post-button {
        position: absolute;
        margin: 20px;
        padding: 15px;
        width: 120px;
        left: 590px;
    }

    .cancel-create-post-button {
        position: absolute;
        margin: 20px;
        padding: 15px;
        width: 120px;
        left: 450px;
    }

    #post-title {
        padding: 5px;
        height: 30px;
    }

    #post-content {
        height: 150px;
    }
</style>