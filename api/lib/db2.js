// db.js
import mysql from "serverless-mysql";

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    },
    zombieMaxTimeout: 300, // 300초 = 5분
});

export default async function executeQuery({ query, values }) {
    try {
        const results = await db.query(query, values);
        return results;
    } catch (error) {
        db.quit();
        throw error;
    } finally {
        await db.end();
    }
}
