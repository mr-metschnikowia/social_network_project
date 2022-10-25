<template>
    <div id="top-panel">`
        <logoutButton class="logoutButton"/>
        <profilePhoto class="miniProfile" :image="profilePic"
                      :username="username" />
        <dropDownMenu class="dropDownMenu" :users="users"
                      @submit-query="userSearch" />
        <!--submit-query event emitted from dropDownMenu element is caught and the userSearch function is triggered
        ; the information sent with the submit-query event is passed to the triggered function as an argument
        -->
    </div>
    <div id="central-panel">
        <homeFeed :feed="feedSubset" />
        <loadPostsButton @load-more-posts="loadMorePosts"/>
    </div>
    <div id="bottom-panel">
        <createPostForm 
            class="createPostForm" 
            :style="{visibility: createPost ? 'visible' : 'hidden'}" 
            @submit-Post="createPostFunction"
            @cancel-create-post="cancelCreatePost"
        />
        <createPostButton class="createPostButton" @create-post="showCreatePostForm" />
    </div>
</template>

<script>
    import logoutButton from "../components/logoutButton";
    import profilePhoto from "../components/profilePhoto";
    import dropDownMenu from "../components/dropDownMenu";
    import createPostButton from "../components/createPostButton";
    import createPostForm from "../components/createPostForm";
    import homeFeed from "../components/homeFeed";
    import loadPostsButton from "../components/loadPostsButton";
    // importing necessary components

    export default {
        name: "HomePage",
        components: {
            profilePhoto,
            dropDownMenu,
            createPostButton,
            createPostForm,
            homeFeed,
            logoutButton,
            loadPostsButton,
        },
        // defining components used
        data() {
            return {
                username: "",
                profilePic: "",
                users: [],
                createPost: false,
                feed: [],
                feedSubset: [],
                // subset of posts from feed that are shown to user
            }
        },
        // component props are associated with vue data stored here and manipulated by methods (use props instead?)
        methods: {
            loadMorePosts() {
                this.feedSubset = this.feedSubset.concat(this.feed.slice(this.feedSubset.length, this.feedSubset.length + 3));
            },
            // load more posts function extends feedSubset to include more posts from feed array 
            async getFeed() {
                await fetch("http://localhost:3000/api/getFeed", {
                    method: "GET",
                    headers: { "Authorization": document.cookie },
                })
                    .then(res => res.json())
                    .then(data => {
                        this.feed = data;
                        this.feedSubset = data.slice(0, 3);
                    })
            },
            async createPostFunction(post) {
                try {
                    await fetch("http://localhost:3000/api/createPost", {
                        method: "POST",
                        headers: { 'Content-type': 'application/json', "Authorization": document.cookie },
                        body: JSON.stringify(post),
                    })
                        .then(res => res.text())
                        .then(text => {
                            alert(text);
                            this.createPost = false;
                            // remove create post form from UI
                        })
                    // make fetch request with post details in it
                } catch (err) {
                    alert("Create post fetch request failed");
                }
            },
            cancelCreatePost() {
                this.createPost = false;
            },
            showCreatePostForm() {
                this.createPost = true;
                // show create post form
            },
            async getProfilePic() {
                try {
                    await fetch("http://localhost:3000/api/getProfilePhoto", {
                        method: "GET",
                        headers: { "Authorization": document.cookie },
                    })
                        .then(res => res.json())
                        .catch(() => {
                            alert("Please login again!");
                            window.location.href = "http://localhost:8080/";
                            return false
                        })
                        // handle errors including jwt expiration error
                        .then(data => {
                            this.username = data.username;
                            this.profilePic = data.photo;
                        })
                    // get user mini profile data from server
                } catch (err) {
                    alert(err);
                }
            }
            // makes fetch request and sets username and profilePic data based on response
            ,
            userSearch(query) {
                
                fetch(`http://localhost:3000/api/getUsers/${query.length > 0 ? query : null}`, {
                    method: "GET",
                    headers: { "Authorization": document.cookie }
                })
                    .then(res => res.json())
                    .then(data => {
                        this.users = data
                    })
                // get all users which match query 
            },
        },
        beforeMount() {
            this.getProfilePic();
            this.getFeed();
        },
        // call functions on page load
    }
</script>

<style>
    #top-panel {
        position: relative;
        border-bottom: solid;
        height: 150px;
    }

    .dropDownMenu {
        position: absolute;
        left: 520px;
        top: 0px;
        z-index: 10;
    }

    .miniProfile {
        position: absolute;
        top: -80px;
        left: 1500px;
    }

    .logoutButton {
        position: absolute;
        top: -110px;
        right: 0px;
    }

    #central-panel {
        position: relative;
        margin-top: 100px;
    }

    #bottom-panel {
        position: relative;
        height: 300px;
    }

    .createPostButton {
        position: absolute;
        top: 100px;
        right: 150px;
    }

    .createPostForm {
        position: absolute;
        bottom: 100%;
        left: 510px;
        z-index: 20;
        background: #ffffff;
    }

</style>