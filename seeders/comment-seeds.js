module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comment', [
      {
        comment_text: 'This is a sample comment.',
        user_id: 1,
        post_id: 1,
        created_at: new Date(),
        // Remove updated_at from the insert data
      },
    ], {});
    console.log('Seed data inserted successfully');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comment', null, {});
  }
};
