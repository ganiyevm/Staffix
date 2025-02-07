// migrations/20250207123456-add-age-to-employee.js
module.exports = {
  async up(db) {
    await db.collection('employees').updateMany(
      {},
      [
        {
          $set: {
            age: {
              $cond: {
                if: { $gte: ["$age", 18] },
                then: { $lte: ["$age", 100] },
                else: 0, 
              },
            },
          },
        },
      ]
    );
  },

  async down(db) {
    await db.collection('employees').updateMany(
      {},
      {
        $unset: { age: "" },
      }
    );
  },
};
