import mongoose from 'mongoose';

// Configure Mongoose to use Node promises.
// By default mongoose use a promise implementation
// that doesn't handle errors.
// http://mongoosejs.com/docs/promises.html
mongoose.Promise = Promise;


const url = 'mongodb://localhost:27017/test';
mongoose.connect(url);

// Models
import User from '../models/users';


export default {
    User,
    close() { mongoose.disconnect(); }
}
