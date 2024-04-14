require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const bcrypt = require('bcrypt');
const exphbs = require('express-handlebars');
const path = require('path');
const cors = require('cors');
// Import models and routes
const Post = require('./models/post');
const { User } = require('./models');
const routes = require('./controllers');
// Helper functions
const helpers = require('./utils/helper');
const withAuth = require('./utils/auth');



const app = express();
const PORT = process.env.PORT || 3001;

// Session configuration
const sess = {
  secret: process.env.SESSION_SECRET, 
  cookie: { maxAge: 3600000 }, // 1 hour
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(cors());
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars setup
const hbs = exphbs.create({
  helpers: {
    formatDate: helpers.formatDate, 
  },
  layoutsDir: path.join(__dirname, 'views/layouts'),
  defaultLayout: 'main',
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Static routes
app.get('/signup', (req, res) => {
  res.render('partials/signup');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.get('/login', (req, res) => {
  res.render('login', { layout: 'main' });
});

// Signup request
app.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });

    req.session.loggedIn = true;
    req.session.user_id = newUser.id;

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error signing up');
  }
});

// Login request
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (user && await bcrypt.compare(req.body.password, user.password)) {
      req.session.loggedIn = true;
      req.session.user_id = user.id;

      res.redirect('/dashboard');
    } else {
      res.status(401).send('Incorrect username or password');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
});

app.post('/api/posts', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.session.user_id
    });

    // Redirect to the home page after successfully creating the post
    res.redirect('/'); 

    // Optionally, you can also send a success message along with the redirect
    // res.redirect('/').json({ message: 'Post created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});
// Use routes from controllers
app.use(routes);

// Global error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/favicon.ico', (req, res) => res.status(204).end());


// Start the Server
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
