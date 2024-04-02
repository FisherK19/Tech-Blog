'use strict';

// Define the up and down functions for the migration
const up = async (queryInterface, Sequelize) => {
  try {
    await queryInterface.bulkInsert('Comment', [
      {
        comment_text: 'This is a sample comment.',
        user_id: 1,
        post_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding comments:', error);
  }
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Comment', null, {});
};

// Export both functions as an object
module.exports = {
  up,
  down
};
