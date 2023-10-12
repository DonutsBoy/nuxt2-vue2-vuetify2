import axios from "axios";

export const state = () => ({
    sidebar: false,
    authUser: null,
});

export const mutations = {
    toggleSidebar: function (state) {
        state.sidebar = !state.sidebar;
    },
    LOGIN: function (state, user) {
        state.authUser = user;
    },
    LOGOUT: function () {
        state.authUser = null;
    },
    SET_USER: function (state, user) {
        state.authUser = user;
    },
    SET_MENU: function (state, data) {
        state.topMenu = data.topMenu;
        state.aside = data.aside;
    },
};

export const actions = {
    // nuxtServerInit 는 모든 페이지를 서버 렌더링하기 전에 Nuxt.js에 의해 호출
    async nuxtServerInit({ commit }, { req }) {
        console.log("nuxtServerInit 실행");
        console.log("req.session.authUser : ", req.session.authUser);
        if (req.session && req.session.authUser) {
            commit("SET_USER", req.session.authUser);
        }
    },
    async login({ commit }, { id, pw }) {
        let { data } = await axios.post("/api/login", { id, pw });
        console.log("data.id : ", data.id);
        // if (!data.id) {
        //위와 아래는 같은의미
        if (data.id == "") {
            throw new Error("로그인에 실패했습니다.");
        }
        console.log("#### !!!!");
        commit("LOGIN", data.id);
    },
    async logout({ commit }) {
        await axios.get("/api/logout").then(() => commit("LOGOUT"));
    },
};
