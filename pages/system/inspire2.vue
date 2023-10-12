<template>
    <v-row>
        <v-col class="text-center">
            <img src="/v.png" alt="Vuetify.js" class="mb-5" />
            <blockquote class="blockquote">
                &#8220;First, solve the problem. Then, write the code.&#8221;
                <footer>
                    <small>
                        <em>&mdash;John Johnson 6666666666666666666666666</em>
                    </small>
                </footer>
            </blockquote>
        </v-col>
    </v-row>
</template>

<script>
import axios from "axios";
export default {
    name: "InspirePage2",
    mounted() {
        // 모든 화면이 렌더링된 후 실행합니다.
        this.$nextTick(function () {
            console.log("#### : ", process.env.TEST);
            console.log("22222");
            this.$store.dispatch("logout").then(() => {
                // alert("11");
                this.$router.push("/login");
            });
        });
    },
};
</script>
