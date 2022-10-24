<template>
	<button @click="logOut">Logout</button>
</template>

<script>
	export default {
		name: "logoutButton",
		methods: {
			logOut() {
				document.cookie = "";
				// this doesnt work - cookies are not deleted
				window.location.href = "http://localhost:8080/";
			}
		}
	}
</script>

<style scoped>
    button {
        border: none;
        background-color: white;
        font-weight: bold;
        text-decoration: underline;
        color: darkblue;
    }
</style>