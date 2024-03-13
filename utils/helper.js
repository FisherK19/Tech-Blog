// helper.js

// Function to format a date in a specific format
const formatDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

module.exports = { formatDate };
