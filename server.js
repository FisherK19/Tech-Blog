// server.js

const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');

// Import routes
const apiRoutes = require('./controllers/api');

// Import authentication middleware
const withAuth = require('./utils/auth');

// helper function
const helpers = require('./utils/helper');

// handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

// session connection to sequelize database
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

// set Handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Use the API routes
app.use('/api', withAuth, apiRoutes); // Add withAuth middleware here

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
