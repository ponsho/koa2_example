import data from './data.json';
import db from './mongoose_connection';

async function importData() {
  await db.User.insertMany(data);
}

async function listUsers() {
  return await db.User.find().exec();
}

async function connect() {
  try {
    await importData();
    console.log('inserted!');
    const users = await listUsers();
    console.log(users);
    await db.close();
  } catch (err) {
    throw err;
  }
}

connect();

