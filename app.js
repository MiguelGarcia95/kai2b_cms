const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session')
const app = express();
const {globalVariables} = require('./config/config');

// configure mongoose to connect to mongodb
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
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

// configure express
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// setup view engine for handlebars
app.engine('handlebars', hbs({defaultLayout: 'default'}));
app.set('view engine', 'handlebars');

// routes
const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})