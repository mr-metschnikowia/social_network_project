<template>
    <div id="registration banner">
        <h1>Join LevBook</h1>
        <router-link to="/">Go back</router-link>
    </div>
    <registerForm 
        @register-user="registerUser"              
    />
</template>

<script>
    import registerForm from '../components/registerForm';

    export default {
        name: "RegisterPage",
        components: { registerForm },
        methods: {
            async registerUser(user) {
                await fetch("http://localhost:3000/api/register", {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(user),
                })
                    .then(res => {
                        if (res.status === 400) {
                            res.text().then(text => alert(text));
                        } else {
                            alert("Registration Successful!");
                            window.location.href = "http://localhost:8080/";
                        }
                    })
            }
        },
    }
</script>