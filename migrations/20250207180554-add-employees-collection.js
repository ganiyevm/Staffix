// migrations/20250207123456-add-employees-collection.js

module.exports = {
  async up(db) {
    await db.createCollection("employees");
  },

  async down(db) {
    await db.dropCollection("employees");
  },
};
