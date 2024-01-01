"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = require("mysql2");
const db = mysql2_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    enableKeepAlive: true
}).promise();
(async () => {
    try {
        const connection = await db.getConnection();
        console.log('Connected to MySQL successfully');
        connection.release();
    }
    catch (err) {
        console.error('Error connecting to MySQL: ', err);
    }
})();
exports.default = db;
//# sourceMappingURL=mysql.js.map