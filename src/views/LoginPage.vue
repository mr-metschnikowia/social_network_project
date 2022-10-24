<template>
    <div id="background-div">
        <LoginPortal
            @login-user="loginUser"
         />
    </div>
</template>

<script>

import LoginPortal from '../components/LoginPortal';

export default {
    name: 'LoginPage',
    components: {
        LoginPortal
        },
    methods: {
      async loginUser(user) {
         await fetch('http://localhost:3000/api/login', {
         method: 'POST',
         headers: {
          'Content-type': 'application/json',
         },
         body: JSON.stringify(user),
         })
         // http post request made using fetch api
         // data: username and password data
         .then(res => {
             if (res.status === 200) {
                res.json().then(data => document.cookie = `token=${data}`)
                // get JWT token from response and create a cookie for the token
                window.location.href = "http://localhost:8080/home";
                // if login is successful, send user to their homepage
            } else {
                 res.text().then(text => alert(text));
            }
         })
         // handle response
      }
    }
}

</script>

<style scoped>
    #background-div {
        height: 720px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url(https://wallpaperaccess.com/full/1567665.png);
    }
</style>