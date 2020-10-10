const path = require('path')
const express= require('express')
const dotenv= require('dotenv')
//logging
const morgan =require('morgan')


const session = require('express-session');
const passport = require('passport');

//templates
const exphbs =require('express-handlebars')                                             
const connectDB = require('./config/db')
//load config
dotenv.config({path: './config/config.env'})

require('./config/passport')(passport); //passed the passport const to config/passport.js so that i can use it there
connectDB()
const app = express()

// logging
//process.env helps in accessing enviornment variables
if(process.env.NODE_ENV === 'development'){
    //middleware
     app.use(morgan('dev'))
 }
// Handlebars
app.engine('.hbs',exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine','hbs');


app.use(
	session({
		secret: 'keyboard cat', //it can be anything
		resave: false, //do not resave the session if nothing is changed
		saveUninitialized: false, //do not create a session until nothing is stored in it
	})
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session()); //to work with passport sessions we need express-session


app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/',require('./routes/index'))
app.use('/auth', require('./routes/auth'));
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))