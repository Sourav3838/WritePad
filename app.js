const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
//logging
const morgan = require("morgan");
const mongoose = require("mongoose");

const session = require("express-session");
//creating sessions
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const methodOverride = require("method-override");
//templates
const exphbs = require("express-handlebars");
const { Mongoose } = require("mongoose");
const connectDB = require("./config/db");
//load config
dotenv.config({ path: "./config/config.env" });

require("./config/passport")(passport); //passed the passport const to config/passport.js so that i can use it there
connectDB();
const app = express();

//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//so that we can pass hidden methods like PUT and  DELETE ,while the form will be having a method as POST
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// logging
//process.env helps in accessing enviornment variables
if (process.env.NODE_ENV === "development") {
  //middleware
  app.use(morgan("dev"));
}

//moment to format date
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require("./helpers/hbs");

// Handlebars
//this will allow us to use .hbs extension instead of .handlebars
//defaultlayout will contain all the layouts which we dont want to repeat again and again,so all the other layouts will be wrapped inside this default layout
app.engine(
  ".hbs",
  exphbs({
    helpers: { formatDate, stripTags, truncate, editIcon, select },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

app.use(
  session({
    secret: "keyboard cat", //it can be anything
    resave: false, //do not resave the session if nothing is changed
    saveUninitialized: false, //do not create a session until nothing is stored in it
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    //now everytime you open the application you dont have to choose your gmail id ,your session will always be stored
    //it will create a sessions table on mongoose collection
    //if you are on dashboard and refresh the page still ypu will be redirected to the dashboard only....where earlier it use to get redirected to the login page
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session()); //to work with passport sessions we need express-session

//set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));
app.use("/notfound", function (req, res) {
  res.render("error/404");
});
// any invalid route will be redirected to route "/notfound"
app.get("/*", function (req, res) {
  res.statusCode = 404;
  res.redirect("/notfound");
});
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
