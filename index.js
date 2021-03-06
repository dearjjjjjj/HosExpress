const express = require('express')
require('dotenv').config()
const  mongoose  = require('mongoose')
const passport = require('passport')
const session = require('express-session');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express()

//get rid of warning 
mongoose.Promise = global.Promise;
//connect to mongodb
// Connect to mongoose
mongoose.connect('mongodb+srv://root:613387@cluster0-fhku0.azure.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors set
app.use(cors());

// Express session midleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  
const user = require('./routes/user');
const usercase = require('./routes/usercase');


app.use('/user',user);
app.use('/usercase', usercase);


const port = process.env.PORT || 5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});