module.exports = {
  async up(db) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    return await db.collection('topics').insertOne({
      title: 'Creating accessible buttons',
      date: '27/10/2021',
      author: 'Franz Lagler',
    });
  },

  async down(db) {
    return await db.collection('topics').deleteOne({
      title: 'Creating accessible buttons',
    });
  },
};
