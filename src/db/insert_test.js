import data from './data.json';
import db from './mongoose_connection';

async function importData() {
    await db.User.insertMany(data);
}

async function connect() {
    try {
        await importData();
        console.log('inserted!');
        await db.close();
    } catch(err) {
        throw err;
    }
}

connect();

