<template>
    <img @click="loadMorePosts" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///9/f395eXl3d3d8fHzX19d0dHT39/fr6+vw8PDz8/P8/PzBwcGpqamNjY2Dg4O0tLTd3d3IyMiTk5OcnJyHh4fT09PDw8Pj4+OioqK7u7uysrLNzc2fn5/c3NysrKwDU9LnAAAEfElEQVR4nO3d6XLaMBQFYCwJ2+ANMIsNJLz/W9YKKYV4u7VpNUdzvk4nf+8dSWiXFwsiIiIiIiIiIiIiIiIiIiIiIiL6K6vlOav3dZYuV65D+RdW54NSyljN30O6dh3Qm1V1qIInRoVZ7DqoN0o2ygQ/Gb1JXAf2LtVBtfKzVO5JMR51uwB/F+PSdXDvsAt78rPCo+vw5jvqgQSbmgpfinFfDX3UVPC+MTmMZpi7jnGeTfev6DOdug5yjvVwI/wuxch1mDPcxouw+bHZuA5zurUgv0aBW4g7SRE2LRG3U9yP/ZDemcx1oFNFhayWBgXqELwaGq89C1F7/ausGTYNEXXolkozVDvXoU50FmeIOqwRDNnAM5SX4cl1qBOdxBleXYc60VIy7rZ05TrUiWJxhqiLp8lBliDwJDiTjUuBp0+fsp8ahdoMJas04JVUOEHUqH3FF8H8CboImy5xfAIV4rbCL9lYPVUX1yHOlOTDPzamdB3hbOvB31OT466zPayK/hTNAXX94sU672uLqvSgBL9cOja57V4+7mitpSpb+8BGl+DdxA/LMnwqSKPCPer6Wr84LY1SuvmnTJl68QvTlsTb5XG59eQEBhERERERuRJV191pd618Wbt4lWwvedjMDRtalxe/5veNZJfrlzm+zlFPmHRbFq21KKOKT9dhvU1Ud+9ehBnqebYf4p4LJfZKiRfLNbEZWPMOPFizGUrQpghfitHIRrfJ0dvix+j+IewB4buRO0FWCL34nUhOKhSuo5xDdIYW9vzsQnrsC/nHZim8b7F1HehktfC+xc11oFNF3p9NFJ8vDVHPlwo6wzvYhsj7Fn8yRD2rL79vcXYd6kT+l6H/7fDo/d212Pv7h+I7pAfYofeH7/eAF1fZoAa2GYqrKW4lFfb5sPcrrUhUTaE329LxFLGvzCwW5ej7NHvXIc60GkuwQJ39PmxH3onyYDN46DawUaiz+xefQe97bYUHJWjFZXcx6hJ1xN2W6nbXrzTqrLDT+hK8nFUwqthAd/Qdot2+sMdp7OuluthffcvvS1Rdz5vb5uzroSgiIiIiIvpforiq4tjXmUVyvOWFnR2aIr/g7sX0irNQP85DG6P1zYMT3k9WdetdDKVr+LXgP3ad64kqAN+xeEjqvjVhjbv5+yzqfYDHPsEDvDn62/BTWD6kuB/eBla16wDnOo9tkWJ//EH0aHmI3TGOvEdnYb9JJzolrJFvWgqKELsQK+EbtLgt8SLMEPWI8Oi7l/jVdCU+I4w6J/70/k12/9/V9/+svv/ft/A/Q3ktRT1Z4/+3girx/UPUYZvww3IN2KWM0QPCd+bDdaCTCa92wXb4zcBUVoYB8OK36Lq6gr2svhDeXlPQ52hHP/4A/R0dKxr4bMCdgf2847fROSLs3PDhNJwi+p0g6zz4bXXUWcWLgRRD1KnvD8eeB81MgDqnaFl9tLbx7QcufNrIt5+3eM3RhKU3BfhtW4damaa+Nv+V1hl8J9GlSrMyP+RldvIyPSIiIiIiIiIiIiIiIplforwrbq+rcJYAAAAASUVORK5CYII="/>
</template>

<script>
    export default {
        name: "loadPostsButton",
        methods: {
            loadMorePosts() {
                this.$emit("load-more-posts");
            },
        },
    }
</script>

<style scoped>
    img {
        position: absolute;
        left: 850px;
        height: 50px;
        width: 50px;
        z-index: 10;
    }
</style>