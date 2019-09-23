const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

// configure mongoose to connect to mongodb
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
}).then(res => {
  console.log("MongoDB connected succesfully")
}).catch(err => {
  console.log("MongoDB connection failed.")
});

// configure express
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// setup view engine for handlebars
// app.engine('handlebars', hbs({defaultLayout: 'default'}));
app.engine('handlebars', hbs({defaultLayout: 'admin'}));
app.set('view engine', 'handlebars');

// routes
app.use('/', (req, res) => {
  res.render('default/index');
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})