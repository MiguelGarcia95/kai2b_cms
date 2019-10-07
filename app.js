const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session')
const methodOverride = require('method-override');
const fileupload = require('express-fileupload');
const passport = require('passport');

const app = express();
const {select, convertTime, addNumber, subNumber, isAdmin, isUser} = require('./config/helperFunctions');
const {globalVariables} = require('./config/config');

// configure mongoose to connect to mongodb
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
}).then(res => {
  console.log("MongoDB connected succesfully")
}).catch(err => {
  console.log("MongoDB connection failed.")
});

// flash & sesion
app.use(session({
  secret: 'mysecret',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());
app.use(globalVariables);

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// configure express
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// setup view engine for handlebars
app.engine('handlebars', hbs({
  defaultLayout: 'default', 
  helpers: {select, convertTime, addNumber, subNumber, isAdmin, isUser}
}));
app.set('view engine', 'handlebars');

// Method Override middleware
app.use(methodOverride('newMethod'));

// fileupload middleware
app.use(fileupload());

// routes
const defaultRoutes = require('./routes/default/index');
const adminRoutes = require('./routes/admin/index');
app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})