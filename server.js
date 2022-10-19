const express = require("express");
const routes = require("./controllers");
// importing the connection to Sequelize from config/connection.js
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helper");
const hbs = exphbs.create({ helpers });
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
    secret: "secrets secrets are no fun",
    // process.env.DB_SECRET originally had this but Heroku threw a fit so I have to reveal it :(
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// express.static() method is a built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets
app.use(express.static(path.join(__dirname, "public")));
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
