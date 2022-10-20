<template>
    <tabs nav-class="tab-parent" nav-item-class="tab" nav-item-link-class="tab-text" panels-wrapper-class="tab-panel"
          :options="{ disableScrollBehavior: true }"
    >
        <tab id="about-panel" name="About">
            {{about}}
        </tab>
        <tab name="Followers">
            <div class="user-menu" id="followers-menu" :key="user.username" v-for="user in followers">
                <dropDownItem :user="user" />
            </div>
        </tab>
        <tab name="Following">
            <div class="user-menu" id="following-menu" :key="user.username" v-for="user in following">
                <dropDownItem :user="user" />
            </div>
        </tab>
    </tabs>
</template>

<script>
    import dropDownItem from "./dropDownItem.vue";

    export default {
        name: "profileTabs",
        components: {
            dropDownItem,
        },
        props: {
            about: String,
            following: Array,
            followers: Array,
        }
    }
</script>

<style>

    #about-panel {
        margin-left: 10%;
    }

    .user-menu {
        background-color: #f6f6f6;
        border: 1px solid #ddd;
        width: 700px;
        text-align: center;
        margin: 0% 32% 0% 32%;
    }

    .tab-parent {
        padding-right: 50%;
        padding-bottom: 50px;
        margin-top: 50px;
        border-bottom: solid #1c4487;
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
        width: 100%;
        margin-top: 5%;
    }
</style>