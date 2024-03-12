// server.js

const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');

// Import routes
const apiRoutes = require('./controllers/api');
const homeRoutes = require('./controllers/home-routes');
const dashboardRoutes = require('./controllers/dashboard-routes');

// Import authentication middleware
const withAuth = require('./utils/auth');

// Helper function
const helpers = require('./utils/helper');

// Handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

// Session connection to sequelize database
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Define session options
const sess = {
  secret: 'Super secret secret',
  cookie: { maxAge: 36000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Middleware
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set Handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Use API routes with authentication middleware
app.use('/api', withAuth, apiRoutes);

// Define routes
app.use('/', homeRoutes); // Route for the homepage
app.use('/dashboard', withAuth, dashboardRoutes); // Dashboard routes

// Turn on connection to database and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

