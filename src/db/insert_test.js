import data from './data.json';
import db from './mongoose_connection';

async function importData() {
  await db.User.insertMany(data);
}

async function insertSingle() {
  let user = new db.User(data[0]);
  // let user = await db.User.findOne( { username: "poncho"} );
  // console.log(data[0]);
  try {
    await user.save();

  } catch (err) {
    // console.log(err);
    throw err;
  }
}

async function listUsers() {
  return await db.User.find().exec();
}

async function connect() {
  try {
    console.log('connected!');

    await insertSingle();
    console.log('inserted!');
    // const users = await listUsers();
    // console.log(users);
    await db.close();
  } catch (err) {
    console.log(err);
    await db.close();

    throw err;

  }
}
connect();

