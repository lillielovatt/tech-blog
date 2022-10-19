// call Sequelize connection constructor function
const Sequelize = require("sequelize");
require("dotenv").config();

// create connection to db, pass in MySQL info for username and pw
var sequelize; //initialize it

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: "localhost",
            dialect: "mysql",
            port: 3306,
        }
    );
}

// importing the base Sequelize class and using it to create a new connection to the database

module.exports = sequelize;
