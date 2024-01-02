import * as mysql from 'mysql2/promise'

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'ordery',
	waitForConnections: true,
	connectionLimit: 10,
	enableKeepAlive: true
});

(async() => {
	try {
		const connection = await db.getConnection()
		console.log('Connected to MySQL successfully')
		connection.release()
	} catch (err) {
		console.error('Error connecting to MySQL: ', err)
		process.exit(1)
	}
})()

export default db
