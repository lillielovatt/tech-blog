const express = require("express");
const routes = require("./routes");
// importing the connection to Sequelize from config/connection.js
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// use the sequelize.sync() method to establish the connection to the database
//  "sync" means Sequelize takes models and connects them to assoc db tables. If it doesn't find a table, it'll create it
// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});
// {force: false} in the .sync() method ->if it were set to true, it would drop and re-create all of the database tables on startup
