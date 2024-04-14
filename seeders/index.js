// Import the seed data functions
const seedUsers = require("./user");
const seedPosts = require("./post");
const seedComments = require("./comment");

// Import the sequelize connection from ../config/connection
const sequelize = require("../config/connection");

// Function to seed all data by calling the three seed functions in sequence
const seedAll = async () => {
  // Sync the sequelize models and wipe out the tables
  await sequelize.sync({ force: true });
  // Call each of the seed data functions
  await seedUsers();
  await seedPosts();
  await seedComments();
  // Exit the process with a successful exit code
  process.exit(0);
};

// Call the seedAll function to seed the database
seedAll();
