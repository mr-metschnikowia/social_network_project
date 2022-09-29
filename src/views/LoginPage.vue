<template>
    <LoginPortal 
       @login-user="loginUser"
     />
</template>

<script>

import LoginPortal from '../components/LoginPortal';

export default {
    name: 'LoginPage',
    components: {
        LoginPortal
        },
    methods: {
      loginUser(user) {
         console.log(user);
      }
    }
}

</script>