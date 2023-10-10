import colors from "vuetify/es5/util/colors";

// import bodyParser from "body-parser";
import session from "express-session"; // cookie: { maxAge: 60000 },

export default {
    env: {
        TEST: process.env.TEST || "기본값!",
        MYSQL_HOST: process.env.MYSQL_HOST || "기본값!",
        MYSQL_DATABASE: process.env.MYSQL_DATABASE || "기본값!",
        MYSQL_USER: process.env.MYSQL_USER || "기본값!",
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "기본값!",
    },
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: "%s - nuxt2-vue2-vuetify2",
        title: "nuxt2-vue2-vuetify2",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: "" },
            { name: "format-detection", content: "telephone=no" },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        "@nuxt/typescript-build",
        // https://go.nuxtjs.dev/vuetify
        "@nuxtjs/vuetify",
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
        "@nuxtjs/pwa", //Nuxt에서 기본적인 PWA (구글에서 밀고 있는 웹기술로 progress web app)를 지원하는 패키지인 @nuxtjs/pwa를 추가
    ],
    /*
     ** Nuxt.js middleware js router
     */
    router: {
        // 모든 라우팅에 대해서 stats 미들웨어가 적용됩니다.
        middleware: "auth",
    },
    serverMiddleware: [
        // express프레임워크에서 세션사용하기 위해 express-session 패키지 사용
        // session middlewar
        session({
            secret: "super-secret-key", // 이건 공대되면 안된다. 암호문을 만드는 암호키이다. // 보안을 위한 임의의 문자열
            resave: false, // 세션에 변경 사항이 없어도 항상 다시 저장할지 여부
            saveUninitialized: false, // 초기화되지 않은 세션을 스토어(저장소)에 강제로 저장할 지 여부
            cookie: {
                // 세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
                httpOnly: true, // true이면 클라이언트 자바스크립트에서 document.cookie로 쿠키 정보를 볼 수 없음
                secure: false, // true이면 https 환경에서만 쿠키 정보를 주고 받도록 처리
                // maxAge: 60000, // 쿠키가 유지되는 시간 (ms 이므로 60000 은 60초이다.) 이시간이 지나면 해당쿠키는 자동으로 삭제된다.
                maxAge: 1000 * 60 * 5, //5분으로 설정
            },
            //s%3AnsaDDdljJ8Vm5P32eXjOWHssgn6opi8f.z3k85haJ0bQU7jB2hH4%2BTG3NK33GJtQ3kzAr7TvQQ5Q 형태로 클라이언트 쿠키로저장되며 . 을 기준으로 앞에는 쿠키아이디 뒤에는 쿠키데이터 같다.
            //secret 로 암호화하고 secret 로 복호화 하는거 같다.
        }),

        // <project root>/api/index.js 모듈을 미들웨어로 추가
        // "~/api/index.js",
        // /api 로 시작하는 모든 요청주소는 ~/api/index.js 에서 처리해주겠다는 것이다.
        { path: "/api", handler: "~/api/index.js" },
    ],
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: "/",
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ["~/assets/variables.scss"],
        theme: {
            dark: true,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                },
            },
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
};
