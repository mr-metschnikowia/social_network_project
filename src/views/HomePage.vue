<template>
    <div id="top-panel">
        <profilePhoto
            :image ="profilePic"
            :username="username"
         />
    </div>
</template>

<script>
    import profilePhoto from "../components/profilePhoto";

    export default {
        name: "HomePage",
        components: {
            profilePhoto
        },
        data() {
            return {
                username: "",
                profilePic: "",
            }
        },
        // component props are associated with vue data stored here and manipulated by methods (use props instead?)
        methods: {
            async getProfilePic() {
                try {
                    await fetch("http://localhost:3000/api/getProfilePhoto", {
                        method: "GET",
                        headers: { "Authorization": document.cookie.slice(6) },
                    })
                        .then(res => {

                            if (res.status === 401) {
                                alert("user authentication failed");
                                window.location.href = "http://localhost:8080/";
                            }
                            // if authentication fails then alert message and user is redirected back to the login page

                            return res.json()
                            // otherwise extract response json data
                        })
                        .then(data => {
                            this.username = data.username;
                            this.profilePic = data.photo;
                        })
                        .catch(() => alert("unable to retrieve user data"))
                        // change data based on json data

                } catch (err) {
                    alert(err);
                }
            }
            // makes fetch request and sets username and profilePic data based on response
        },
        beforeMount() {
            this.getProfilePic();
        },
        // call functions on page load
    }

</script>