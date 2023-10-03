import mysql from "serverless-mysql";

import executeQuery2 from "./lib/db2";
// const db = require("./lib/db");

// <project root>/api/index.js
const express = require("express");

// express 인스턴스 생성
const app = express();

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

    result[0].query = qry1; //쿼리내용

    console.log("#### ", process.env.TEST);
    // res.send("API root");
    // res.send({ id: "test" });
    res.send(result[0]);
});

app.get("/test1", function (req, res) {
    // res.send("API root");
    res.send({ id: "test1" });
});

app.get("/test1/test1", function (req, res) {
    // res.send("API root");
    res.send({ id: "test1 test1" });
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
