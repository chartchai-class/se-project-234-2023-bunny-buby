const mysql = require("mysql2");

let config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

let connection = {}
function connect() {
    connection.mysql = mysql.createConnection(config);
    connection.mysql.connect((err) => {
        if (err) {
            console.error("Error connecting to the database:", err);
            console.log("Retrying in 5 seconds");
            setTimeout(connect, 5000)
            return;
        }
        console.log("Database is connected");
    });
}
 
connect();

module.exports = connection 
