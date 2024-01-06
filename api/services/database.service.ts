import * as mysql from 'mysql2/promise'

const db = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	enableKeepAlive: true
});

(async() => {
	try {
		const connection = await db.getConnection()
		console.log('Connected to database successfully')
		connection.release()
	} catch (err) {
		console.error('Error connecting to MySQL database: ', err)
		process.exit(1)
	}
})()

export default db
