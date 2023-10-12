export default function ({ store, redirect, error }) {
    // auth 확인
    console.log("store.state : ", store.state);
    // 웹브라우저 주소창에 직접입력하거나 페이지이동시 실행된다.
    // 인증을 받지 못한 경우 로그인 페이지로 리다이렉트 시킬 수 있습니다.
    // authUser 에 null 이면 true 출력
    //맨최초에 http://localhost:3000 접속했을때와 http://localhost:3000 접속후에 http://localhost:3000/login 로 리다이렉트 할때 실행된다. 라우터이동할때 실행안된다.
    if (!store.state.authUser) {
        console.log("################");
        //백엔드에서는 세션스토리지 사용하면 무조건 null 이라고만 나온다. 사용못한다.
        // if (sessionStorage.getItem("loginYn") != "Y") {
        return redirect("/login");
    }
}
