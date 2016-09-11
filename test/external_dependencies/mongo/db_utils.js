import mongoose from 'mongoose';
import connectionString from '../../../src/db/mongoose_config';

export default async function dropTestDb() {
  try {
    await mongoose.connect(connectionString);
    await mongoose.connection.db.dropDatabase();
  } catch (err) {
    console.log('Error while trying to delete the test db');
    console.log(err);
    throw err;
  }
}
