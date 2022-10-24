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
        <homeFeed :feed="feed" />
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
        },
        // defining components used
        data() {
            return {
                username: "",
                profilePic: "",
                users: [],
                createPost: false,
                feed: [],
            }
        },
        // component props are associated with vue data stored here and manipulated by methods (use props instead?)
        methods: {
            async getFeed() {
                await fetch("http://localhost:3000/api/getFeed", {
                    method: "GET",
                    headers: { "Authorization": document.cookie },
                })
                    .then(res => res.json())
                    .then(data => { this.feed = data })
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
                        .then(res => {
                            /*
                            if (res.status === 401) {
                                alert("user authentication failed");
                                window.location.href = "http://localhost:8080/";
                            }
                            // if authentication fails then alert message and user is redirected back to the login page
                            */

                            return res.json()
                            // otherwise extract response json data
                        })
                        .catch((err) => {
                            alert(err);
                            document.cookie = "";
                            window.location.href = "http://localhost:8080/";
                            return false
                        })
                        // handle any issues with fetch request by sending alert, redirecting to login page and clearing browser cookies - this doesnt work yet
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
        top: 150px;
    }

    #central-panel {
        position: relative;
        top: 250px;
    }

    .dropDownMenu {
        position: absolute;
        left: 520px;
        top: -175px;
        z-index: 10;
    }

    .miniProfile {
        position: absolute;
        top: -230px;
        left: 1500px;
    }

    #bottom-panel {
        position: relative;
    }

    .createPostButton {
        position: absolute;
        bottom: 50px;
        right: 150px;
    }

    .createPostForm {
        position: absolute;
        bottom: 50px;
        left: 510px;
        z-index: 10;
        background: #ffffff;
    }

    .logoutButton {
        position: absolute;
        top: -260px;
        right: 0px;
    }
</style>