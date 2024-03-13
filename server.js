const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

// Helper function
const helpers = require('./utils/helper');

// Handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
  helpers,
  layoutsDir: path.join(__dirname, 'views', 'layouts') 
});

// Session connection to Sequelize database
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: { maxAge: 36000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set Handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Specify the views directory

// Error handling middleware
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Define routes to handle navigation URLs
app.get('/dashboard', (req, res, next) => {
  // Handle '/dashboard' route
  try {
    res.render('dashboard'); // Render the corresponding Handlebars template
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

app.get('/login', (req, res, next) => {
  // Handle '/login' route
  try {
    res.render('login'); // Render the corresponding Handlebars template
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

app.get('/logout', (req, res) => {
  // Handle '/logout' route
  // Implement logout logic here
});

// Turn on routes
app.use(routes);

// Turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
