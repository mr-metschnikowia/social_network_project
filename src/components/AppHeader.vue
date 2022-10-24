<template>
    <h1 id="social_network_title"><a href="http://localhost:8080/home">Welcome to LevBook</a></h1>
</template>

<script>
export default {
    name: "AppHeader",
    }
</script>

<style scoped>
    #social_network_title {
        text-align: left;
        margin-left: 50px;
    }

    a {
        color: #1c4487;
        text-decoration: none;
        font-size: 35px;
    }

    body {
        background-color: darkblue;
    }
</style>