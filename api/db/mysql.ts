import mysql from 'mysql2'

const db = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	enableKeepAlive: true
}).promise();

(async() => {
	try {
		const connection = await db.getConnection()
		console.log('Connected to MySQL successfully')
		connection.release()
	} catch (err) {
		console.error('Error connecting to MySQL: ', err)
	}
})()

export default db
