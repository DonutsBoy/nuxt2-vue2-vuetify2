import mysql from "serverless-mysql";

import executeQuery2 from "./lib/db2";
// const db = require("./lib/db");

// express 4.16.0 버전에서는 bodyParser가 express generator에 내장되어 있어 따로 설치하지 않아도
// 현재 내가 사용하고 있는 4.18.2 버전에서는 bodyParser가 다시 떨어져 나온 것 같다. 설치가 필요한 경우 커맨드 라인에서 아래의 명령어로 설치한 후
// npm i body-parser
const bodyParser = require("body-parser");

// <project root>/api/index.js
const express = require("express");

// express 인스턴스 생성
const app = express();

app.set("etag", false); //이거 써줘야 304 코드가 아닌 200 코드가 뜬다.

//아래를 안해주면 body 에 객체형태 {"id":id, "pw":pw} 보내준 값들이 모두 undefined 로 받게된다. req.body 하면 undefined 로 출력된다.
//바디값을 json형식으로 출력함
app.use(bodyParser.json());

app.get("/inspire", async function (req, res) {
    // console.log("req.session.id : ", req.session.id); // uCOWnTaxlheEl-8zBQpFh-cmDZ8qMc9D 예를들어 이런값이 출력된다. 세션아이디 같다.
    // console.log("req.session.authUser : ", req.session.authUser);
    res.send("API root");
});

// 실제로는 /api 라우트를 처리하는 메소드가 된다.
// dotenv플러그인이 내장되어 있는 것을 확인했다.
app.get("/", async function (req, res) {
    // const db = mysql({
    //     config: {
    //         host: process.env.MYSQL_HOST,
    //         port: process.env.MYSQL_PORT,
    //         database: process.env.MYSQL_DATABASE,
    //         user: process.env.MYSQL_USER,
    //         password: process.env.MYSQL_PASSWORD,
    //     },
    //     zombieMaxTimeout: 300, // 300초 = 5분
    // });
    // let s1 = "121212";
    // let qry1 = `
    //       SELECT COUNT(*), ? AS CNT1,? AS CNT2
    //       FROM POSTS /* ${s1} */
    //     `;
    // let result = await db.query(
    //     qry1,
    //     ["ddd", "22"] //파라미터2개이상일때
    // );

    let s1 = "121212";
    let qry1 = `
          SELECT COUNT(*), ? AS CNT1,? AS CNT2
          FROM POSTS /* ${s1} */
        `;
    // let result = null;
    // try {
    //     result = await db.query(
    //         qry1,
    //         ["ddd", "22"] //파라미터2개이상일때
    //     );
    // } catch (error) {
    //     db.quit();
    //     throw error;
    // } finally {
    //     await db.end();
    // }
    // console.log("db : ", db);
    // let result = await db.executeQuery({ query: qry1, values: ["ddd", "22"] });

    let result = await executeQuery2({
        query: qry1,
        values: ["ddd", "22"], //파라미터2개이상일때
        // values: "22", //파라미터 1개이상일때
    });

    console.log("qry1 :", qry1);
    console.log("result :", result);
    req.session;
    result[0].query = qry1; //쿼리내용

    console.log("3333 : ", req.session.cookie.maxAge / 1000); // 세션쿠키 만료일시 세컨드로 출력
    // req.session.cookie.maxAge = 1000 * 60 * 1;//이건 안되는거 같다.
    req.session.authUser2 = "777";

    console.log("#### : > ", process.env.TEST);
    console.log("req.session : ", req.session);
    console.log("req.session.id : ", req.session.id); // uCOWnTaxlheEl-8zBQpFh-cmDZ8qMc9D 예를들어 이런값이 출력된다. 세션아이디 같다.
    console.log("req.session.authUser : ", req.session.authUser);
    req.session.views = 1;

    if (req.session.authUser == undefined) {
        return res.send({ CNT1: "9999" });
    }
    console.log("&&&&&&&&&&&&&&");

    // 아래 해보니까 로그인페이지로 get방식 페이지 이동 안한다.
    // delete req.session.authUser;
    // return res.redirect("/login"); //get방식 페이지이동

    // res.send("API root");
    res.send({ data: result[0], timeout: Math.floor(req.session.cookie.maxAge / 1000) });
});

app.get("/test1", function (req, res) {
    // res.send("API root");
    res.send({ id: "test1" });
});

app.get("/test1/test1", function (req, res) {
    // res.send("API root");
    res.send({ id: "test1 test1" });
});

app.post("/login", (req, res) => {
    console.log("req.body : ", req.body);
    console.log("req.body.id : ", req.body.id);
    if (req.body.id === "admin" && req.body.pw === "1") {
        req.session.authUser = req.body.id;
        req.session.authUser2 = req.body.id;
        return res.json({ id: "admin" });
    }
    // return res.json({ id: "" });
    return res.send({ id: "" });
});

app.get("/logout", (req, res) => {
    console.log("logout!");
    delete req.session.authUser; //객체의 값을 삭제
    res.json({ ok: true });
});

console.log("##############");

// 모듈로 사용할 수 있도록 export
// // 앱의 /api/* 라우트로 접근하는 모든 요청은 모두 app 인스턴스에게 전달된다.
// module.exports = {
//     path: "/test",
//     handler: app,
// };

// 모듈로 사용할 수 있도록 export
module.exports = {
    handler: app,
};
