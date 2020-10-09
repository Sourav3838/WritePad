const express= require('express')
const dotenv= require('dotenv')
//logging
const morgan =require('morgan')
//templates
const exphbs =require('express-handlebars')                                             
const connectDB = require('./config/db')
//load config
dotenv.config({path: './config/config.env'})
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

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))