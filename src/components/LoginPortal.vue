<template>
    <div id="login_portal">
        <h1>Login Portal</h1>
        <img :src="img" />
        <form id="login form">
            Username: <input type="text" v-model="username" />
            Password: <input type="text" v-model="password"/>
        </form>
        <button @click="submitLogin()">Login</button>
        <router-link to="/register">Register</router-link>
        <button v-on:click="changeImage()">Change photo</button>
    </div>
</template>

<script>
export default {
    name: "LoginPortal",
    data() {
        return {
            img: 'https://picsum.photos/seed/${Math.random()}/500/300',
            username: "",
            password: "",
        }
    },
    methods: {
        changeImage() { this.img = `https://picsum.photos/seed/${Math.random()}/500/300` },
        submitLogin() {

            if (!this.username) {
                alert('Please add a username');
                return
            } else if (!this.password) {
                alert('Please add a password');
                return 
            }
            // check if user has given input for password and username

            const existingUser = {
                username: this.username,
                password: this.password,
            }
            // grab inputted username and password
            this.$emit('login-user', existingUser);
            // emit username and password

            this.username = '';
            this.password = '';
            // clear username and password

        },
    }
}
</script>

<style scoped>
body {
    text-align: center;
}

#network_logo {
    text-align: left;
    margin: 30px;
}

input {
    margin: 10px;
    padding: 10px;
}

button {
    margin: 10px;
    padding: 10px;
}

img {
    margin: 20px;
}
</style>