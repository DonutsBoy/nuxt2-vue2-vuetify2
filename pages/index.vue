<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
            <v-card class="logo py-4 d-flex justify-center">
                <NuxtLogo />
                <VuetifyLogo />
            </v-card>
            <v-card>
                <v-card-title class="headline">
                    Welcome to the Vuetify + Nuxt.js template 타임아웃값 : {{ timeout }} 초
                </v-card-title>
                <v-card-text>
                    <p>
                        Vuetify is a progressive Material Design component framework for Vue.js. It
                        was designed to empower developers to create amazing applications.
                    </p>
                    <p>
                        For more information on Vuetify, check out the
                        <a href="https://vuetifyjs.com" target="_blank" rel="noopener noreferrer">
                            documentation </a
                        >.
                    </p>
                    <p>
                        If you have questions, please join the official
                        <a
                            href="https://chat.vuetifyjs.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="chat"
                        >
                            discord </a
                        >.
                    </p>
                    <p>
                        Find a bug? Report it on the github
                        <a
                            href="https://github.com/vuetifyjs/vuetify/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="contribute"
                        >
                            issue board </a
                        >.
                    </p>
                    <p>
                        Thank you for developing with Vuetify and I look forward to bringing more
                        exciting features in the future.
                    </p>
                    <div class="text-xs-right">
                        <em><small>&mdash; John Leider</small></em>
                    </div>
                    <hr class="my-3" />
                    <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer">
                        Nuxt Documentation
                    </a>
                    <br />
                    <a
                        href="https://github.com/nuxt/nuxt.js"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Nuxt GitHub
                    </a>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" nuxt to="/inspire"> Continue2 {{ this.isOpen }}</v-btn>
                    <v-btn color="primary" nuxt @click="excelDown1"> onclick</v-btn>
                    <NuxtLink to="/login">Go to login</NuxtLink>
                    <v-btn color="primary" nuxt @click="loginKeycloak"> 키클락 로그인</v-btn>
                    <v-btn color="primary" nuxt @click="logoutKeycloak"> 키클락 로그아웃</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
//아래 패키지는 프론트에서 가져오기 하면 에러난다 백엔드에서만 사용가능하다.
// import mysql from "serverless-mysql";

import axios from "axios";
export default {
    name: "IndexPage",
    // 인스턴스가 작성된 후 동기적으로 호출됩니다
    // created는 렌더링은 안되었지만 Vue 인스턴스가 생성 되면서 동작하는 Hook이라고 보시면됩니다.
    // virtual dom은 사용할 수 없지만 Data에 접근 및 초기화 하거나 이벤트를 처리하는데 자주 이용됩니다.
    // created 훅에서는 이제 data와 events(data와 events(vm.$on, vm.$once, vm.$off, vm.$emit))가 활성화되어 접근할 수 있다.
    // 여전히 템플릿과 가상돔은 마운트 및 렌더링되지 않은 상태이다.
    // 크레이티드 : 발음
    created() {},
    // 모든 컴포넌트가 생성되었을때 콜백 함수 입니다.
    // 컴포넌트, 템플릿, 렌더링 된 DOM 에 접근할 수 있다.
    // 마운티드 : 모든 컴포넌트가 마운트 된후 호출됩니다.
    // 마운트 뜻 : 탑재하다 연결하다
    mounted() {
        // setInterval(this.getStatus, 5000);
        // this.getStatus를 5초마다 반복 실행.

        // 모든 화면이 렌더링된 후 실행합니다.
        this.$nextTick(function () {
            console.log("#### : ", process.env.TEST);
            var param = {};
            axios
                // .get("https://jsonplaceholder.typicode.com/users", {
                .get("/api", {
                    params: param,
                })
                .then((response) => {
                    //세션쿠키변수가 삭제도면 로그아웃
                    if (response.data.CNT1 == "9999") {
                        this.$router.push("/login");
                    }
                    this.timeout = response.data.timeout;
                    console.log(response.data.CNT1);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    },
    data() {
        return {
            isOpen: true,
            timeout: 0,
        };
    },
    methods: {
        getStatus() {
            //그냥 백엔드 호출만 해도 세션쿠키 만료기간이 업데이트 된다.
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
        },
        // 화살표 함수로 methods를 정의하면, this값이 window 객체를 가리키기 때문에 data에 접근할 수 없다.
        // 따라서 methods를 정의할 때에는 일반 함수를 쓰도록 하자.
        loginKeycloak() {
            this.$auth.loginWith("keycloak");
        },
        async logoutKeycloak() {
            console.log("this.$auth.user :", this.$auth.user);
            console.log("this.$auth.loggedIn :", this.$auth.loggedIn);
            await this.$auth.logout();
            this.$router.push("/");
        },
        excelDown1() {
            var param = {};
            axios
                // .get("https://jsonplaceholder.typicode.com/users", {
                .get("/api", {
                    params: param,
                })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
