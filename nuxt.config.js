import colors from "vuetify/es5/util/colors";

// import bodyParser from "body-parser";
// import session9 from "express-session"; // cookie: { maxAge: 60000 },
const session9 = require("express-session");
const MemoryStore = require("memorystore")(session9);
// const maxAge2 = 1000 * 60 * 1; //만료기간 1분
const maxAge2 = 1000 * 10; //10초후에 세션쿠키 만료

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

        // 아래 모듈 사용시 express-session 를 사용해서 세션 사용시 로그인후 메뉴 이동하면 바로 세션이 없어진다.
        // "@nuxtjs/auth-next", //수동으로 키클락 로그인 추가하고 추가시 기존에 express-session 방식 세션쿠키가 동작하지 않는다.
    ],
    /*
     ** Nuxt.js middleware js router
     */
    // router: {
    //     //페이지이동일때만 실행된다. 라우트 이동일때는 실행안된다.
    //     middleware: "auth",
    // },
    serverMiddleware: [
        // express프레임워크에서 세션사용하기 위해 express-session 패키지 사용
        // session middlewar
        session9({
            key: "jun-sid", // 세션쿠키명을 내가 원하는이름으로 만들수 있다. 미설정시 connect.sid 로 만들어짐
            // secret: "super-secret-key-112233", // 이건 공대되면 안된다. 암호문을 만드는 암호키이다. // 보안을 위한 임의의 문자열
            secret: "Rs89I6TESAFGDKELD",
            resave: false, // 세션에 변경 사항이 없어도 항상 다시 저장할지 여부
            saveUninitialized: false, // 초기화되지 않은 세션을 스토어(저장소)에 강제로 저장할 지 여부
            // store: new MemoryStore({ checkPeriod: maxAge2 }), // 세션을 메모리에 저장하는 방식 (톰캣과 같은 방식)
            rolling: true, //기본값은 false 이며 true 시 백엔드 api 호출시 세션쿠키 만료기간이 자동으로 maxAge 세컨드만큼 업데이트 된다.
            cookie: {
                // 세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
                httpOnly: true, // true이면 클라이언트 자바스크립트에서 document.cookie로 쿠키 정보를 볼 수 없음
                secure: false, // true이면 https 환경에서만 쿠키 정보를 주고 받도록 처리
                // maxAge: 60000, // 쿠키가 유지되는 시간 (ms 이므로 60000 은 60초이다.) 이시간이 지나면 해당쿠키는 자동으로 삭제된다.
                // maxAge: 1000 * 60 * 2, //1분으로 설정
                maxAge: maxAge2,
                // maxAge: 0, //0 입력시 0초후에 쿠키값이 삭제되어 쿠키값이 생성안되서 계속 로그인창이 뜬다 -_-
                // maxAge 주석처리시 개발자도구 애플리케이션탭 Cookies 트리에 Expires 에 Session 이라고 나와 웹브라우저를 모두 종료하면 그때 블라우저 세션이 끝나 쿠키도 삭제됨
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

    auth: {
        strategies: {
            keycloak: {
                scheme: "oauth2",
                endpoints: {
                    authorization: `http://ec2-3-37-128-130.ap-northeast-2.compute.amazonaws.com:83/realms/zet/protocol/openid-connect/auth`,
                    userInfo: `http://ec2-3-37-128-130.ap-northeast-2.compute.amazonaws.com:83/realms/zet/protocol/openid-connect/userinfo`,
                    token: `http://ec2-3-37-128-130.ap-northeast-2.compute.amazonaws.com:83/realms/zet/protocol/openid-connect/token`,
                    logout: `http://ec2-3-37-128-130.ap-northeast-2.compute.amazonaws.com:83/realms/zet/protocol/openid-connect/logout`,

                    // authorization: `${process.env.KEYCLOAK_HOST}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/auth`,
                    // userInfo: `${process.env.KEYCLOAK_HOST}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
                    // token: `${process.env.KEYCLOAK_HOST}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
                    // logout:
                    //     `${process.env.KEYCLOAK_HOST}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout?redirect_uri=` +
                    //     encodeURIComponent(String(process.env.HOME_URI)),
                },
                token: {
                    property: "access_token",
                    type: "Bearer",
                    name: "Authorization",
                    maxAge: 1800, // Can be dynamic ?
                },
                refreshToken: {
                    property: "refresh_token",
                    maxAge: 60 * 60 * 24 * 30, // Can be dynamic ?
                },
                responseType: "code",
                grantType: "authorization_code",
                // clientId: process.env.KEYCLOAK_CLIENT_ID,
                clientId: "web-client",

                scope: ["openid", "profile", "email"],
                codeChallengeMethod: "S256",
            },
        },
        redirect: {
            logout: "/",
            callback: "/",
            home: "/dashboard",
        },
    },
};
