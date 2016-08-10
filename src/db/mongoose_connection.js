import mongoose from 'mongoose';
import data from './data.json';


mongoose.Promise = global.Promise;
const url = 'mongodb://localhost:27017/test';

async function importData() {
    const userSchema = new mongoose.Schema({
        name: String,
        address: Object,
    });

    const User = mongoose.model('User', userSchema);
    await User.insertMany(data);
}
async function connect() {
    try {
        await mongoose.connect(url);
        await importData();
    } catch(err) {
        throw err;
    }
}

connect();

// mongoose.connect(url)
//     .then(importData)
//     .catch(() => console.log('Could not connect!'));

