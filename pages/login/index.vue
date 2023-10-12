<template>
    <v-app id="inspire">
        <v-main>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs2 sm6 md3>
                        <v-card class="elevation-12">
                            <v-form @submit.prevent>
                                <v-toolbar dark color="primary">
                                    <v-toolbar-title>관리자 로그인</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                </v-toolbar>
                                <v-card-text>
                                    <v-text-field
                                        prepend-icon="ID"
                                        id="id"
                                        name="id"
                                        label="id11"
                                        type="text"
                                        v-model="frmId"
                                    ></v-text-field>
                                    <v-text-field
                                        prepend-icon="PW"
                                        id="pw"
                                        name="pw"
                                        label="pw11"
                                        type="password"
                                        v-model="frmPw"
                                    ></v-text-field>
                                </v-card-text>

                                <p v-if="returnMsg" class="error">{{ returnMsg }}</p>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" @click="login"> 로그인 </v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: "index",
    layout: "loginLayout",
    data() {
        return {
            returnMsg: null,
            frmId: "",
            frmPw: "",
        };
    },
    methods: {
        async login() {
            // console.log(this.$store);
            try {
                console.log("22222");
                await this.$store.dispatch("login", {
                    id: this.frmId,
                    pw: this.frmPw,
                });
                // .then(() => this.redirect());
                // 위의 .then() 이용해도 아래와 같은 역할이다. 단 에러가 발생하면 위나 아래나 실행안된다.
                this.redirect(); //라우터이동
                console.log("333333");
            } catch (e) {
                this.returnMsg = e.message;
            }
        },
        redirect() {
            this.$router.push("/");
        },
    },
};
</script>
