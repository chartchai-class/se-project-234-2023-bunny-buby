const mysql = require("mysql2");

let config =  { host: "localhost", 
user: "root", 
password: "@Q0968910466q", 
database: "sport_project" 
}; 
module.exports = mysql.createConnection(config) 



