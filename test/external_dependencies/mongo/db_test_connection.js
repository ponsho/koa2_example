const mongoose = require(`${rootDir}/src/db/db_config`).default;

const url = 'mongodb://localhost:27017/test-its';

export async function dropTestDb() {
  try {
    await mongoose.connect(url);
    await mongoose.connection.db.dropDatabase();
  } catch (err) {
    console.log('Error while trying to delete the test db');
    console.log(err);
    throw err;
  }

}
