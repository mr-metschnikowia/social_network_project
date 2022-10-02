<template>
    <div class="wrapper" id="registration">
        <form id="register-form">
            Username: <input type="text" v-model="username" />
            Password: <input type="text" v-model="password"/>
            Confirm Password: <input type="text" v-model="confirmPassword"/>
        </form>
        <button @click="register()">Register</button>
    </div>
</template>

<script>
export default {
    name: "registerForm",
    data() {
        return {
            username: "",
            password: "",
            confirmPassword: "",
        }
    },
    methods: {
        register() {

            if (!this.username) {
                alert('Please add a username');
                return
            } else if (!this.password) {
                alert('Please add a password');
                return 
            } else if (this.password !== this.confirmPassword) {
                alert("Passwords are not the same!")
                return
            }
            // check username, password and confirmation of password

            const newUser = {
                username: this.username,
                password: this.password,
            }
            // grab inputted username and password        

            this.$emit('register-user', newUser);
            // emit username and password
        },
    }
}
</script>

<style scoped>
.wrapper {
  margin: auto;
  width: 12%;
  display: grid;
  grid-template-columns: 200px;
}

input {
    margin: 10px;
    padding: 10px;
}

#register-form {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 4;
}

button {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 4;
    grid-row-end: 5;
    padding: 10px;
    margin: 10px;
}
</style>