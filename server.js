const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const bcrypt = require('bcrypt');

// Import the User model
const { User } = require('./models');

// Helper function
const helpers = require('./utils/helper');

// Handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
  helpers,
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  defaultLayout: 'main' // Specify the default layout file
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
    res.render('login', { layout: 'main' }); // Specify the layout explicitly
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

// Handle login form submission
app.post('/login', async (req, res) => {
  // Logic for handling login
});

app.get('/logout', (req, res) => {
  // Handle '/logout' route
  // Implement logout logic here
  req.session.destroy(() => {
    res.redirect('/login'); // Redirect to the login page after logout
  });
});

// Handle sign-up form submission
app.post('/signup', async (req, res) => {
  try {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user record in the database
    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });

    // Set the loggedIn session variable to true
    req.session.loggedIn = true;
    req.session.user_id = newUser.id;

    res.redirect('/dashboard'); // Redirect to the dashboard after sign-up
  } catch (error) {
    console.error(error);
    res.status(500).send('Error signing up');
  }
});

// Turn on routes
app.use(routes);

// Turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
