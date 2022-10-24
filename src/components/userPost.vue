<template>
    <div id="post">
        <div>
            <p class="meta-data" id="post-username">{{post.username}}</p>
            <p class="meta-data" id="post-data">{{post.date}}</p>
        </div>
        <div id="post-main">
            <h3 class="main-post" id="post-title">{{post.title}}</h3>
            <p class="main-post" id="post-content">{{post.content}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userPost",
        props: {
            post: Object,
        }
    }
</script>

<style scoped>
    #post {
        border: solid #1c4487;
        margin: auto;
        margin-bottom: 50px;
        margin-left: 545px;
        width: 40%;
        min-height: 200px;
    }

    .meta-data {
        display: inline-block;
        width: 50%;
    }

    #post-main {
        text-align: left;
    }

    .main-post {
        padding-left: 50px;
    }
</style>