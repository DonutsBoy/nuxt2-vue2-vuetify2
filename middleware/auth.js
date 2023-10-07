export default function ({ store, redirect, error }) {
    // auth 확인
    console.log("store.state : ", store.state);
    if (!store.state.authUser) {
        console.log("################");
        //백엔드에서는 세션스토리지 사용하면 무조건 null 이라고만 나온다. 사용못한다.
        // if (sessionStorage.getItem("loginYn") != "Y") {
        return redirect("/login");
    }
}
