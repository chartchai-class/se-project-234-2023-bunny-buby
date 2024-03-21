const mysql = require("mysql2");

let config = {
    host: "localhost",
    user: "root",
    password: "Patty.27092003",
    database: "sport_project"
};

module.exports = mysql.createConnection(config) 
