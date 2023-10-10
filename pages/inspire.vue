<template>
    <v-row>
        <v-col class="text-center">
            <img src="/v.png" alt="Vuetify.js" class="mb-5" />
            <blockquote class="blockquote">
                &#8220;First, solve the problem. Then, write the code.&#8221;
                <footer>
                    <small>
                        <em>&mdash;John Johnson</em>
                    </small>
                </footer>
            </blockquote>
        </v-col>
    </v-row>
</template>

<script>
import axios from "axios";
export default {
    name: "InspirePage",
    mounted() {
        // 모든 화면이 렌더링된 후 실행합니다.
        this.$nextTick(function () {
            console.log("#### : ", process.env.TEST);
            var param = {};
            axios
                // .get("https://jsonplaceholder.typicode.com/users", {
                .get("/api/inspire", {
                    params: param,
                })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    },
};
</script>
