<template>
    <div>
        <div id="login_portal">
            <h1>Login Portal</h1>
            <form id="login form">
                Username: <input type="text" v-model="username" />
                Password: <input type="text" v-model="password" />
            </form>
            <button @click="submitLogin()">Login</button>
            <router-link class="register" to="/register">Register</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoginPortal",
    data() {
        return {
            username: "",
            password: "",
        }
    },
    methods: {
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

            this.username = "";
            this.password = "";
        },
    }
}
</script>

<style scoped>
    body {
        text-align: center;
    }

    input {
        margin: 30px 80px 5px 0px;
        padding: 10px;
    }

    button {
        position: absolute;
        width: 100px;
        margin: 0px;
        top: 260px;
        left: 150px;
        padding: 10px;
    }

    #login_portal {
        position: absolute;
        border: solid;
        color: darkblue;
        margin: 7% 40% 0% 40%;
        height: 400px;
        width: 400px;
    }

    .register {
        position: absolute;
        top: 330px;
        left: 170px;
    }

    div {
        position: relative;
        background-color: white;
    }
</style>