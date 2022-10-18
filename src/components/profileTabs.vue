<template>
    <tabs nav-class="tab-parent" nav-item-class="tab" nav-item-link-class="tab-text" panels-wrapper-class="tab-panel">
        <tab name="About">
            {{about}}
        </tab>
        <tab name="Followers">
            Followers here
        </tab>
        <tab name="Following">
            Following here
        </tab>
    </tabs>
</template>

<script>
    export default {
        name: "profileTabs",
        props: {
            about: String,
            following: Array,
            followers: Array,
        }
    }
</script>

<style>
    .tab-parent {
        padding-right: 50%;
        margin-top: 50px;
    }

    .tab {
        display: inline-block;
        width: 30%;
    }

    .tab-text {
        font-size: 25px;
        font-weight: bold;
        color: #1c4487;
        text-decoration: none;
    }

    .tab-panel {
        text-align: left;
        padding: 5% 0% 0% 9.5%;
    }
</style>