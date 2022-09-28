<template>
    <div id="login_portal">
        <h1>Login Portal</h1>
        <img :src="img" />
        <form id="login form">
            Username: <input />
            Password: <input />
        </form>
        <button>Login</button>
        <button>Register now!</button>
        <button v-on:click="changeImage()">Change photo</button>
    </div>
</template>

<script>
export default {
    name: "LoginPortal",
    data() {
        return { img: 'https://picsum.photos/seed/${Math.random()}/500/300' }
    },
    methods: {
        changeImage() { this.img = `https://picsum.photos/seed/${Math.random()}/500/300`}
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