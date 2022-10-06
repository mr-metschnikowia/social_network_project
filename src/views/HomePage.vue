<template>
    <h1>Your Feed</h1>
    <button @click="authUser">Authorise User</button>
</template>

<script>
    export default {
        name: "HomePage",
        methods: {
            async authUser() {
                try {
                    await fetch("http://localhost:3000/api/authentication-test", {
                        method: "POST",
                        headers: { 'Content-type': 'application/json', "Authorization": document.cookie.slice(6) },
                    })
                        .then(res => {

                            if (res.status === 401) {
                                window.location.href = "http://localhost:8080/";
                            }

                            return res.text()
                        })
                        .then(text => alert(text))

                } catch (err) {
                    alert(err);
                }
            }
        }
    }
</script>