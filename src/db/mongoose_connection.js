import mongoose from 'mongoose';

// Models
import User from '../models/users';

// Configure Mongoose to use Node promises.
// By default mongoose use a promise implementation
// that doesn't handle errors.
// http://mongoosejs.com/docs/promises.html
mongoose.Promise = Promise;

const url = 'mongodb://localhost:27017/test';
mongoose.connect(url);

export default {
  User,
  close() {
    mongoose.disconnect();
  },
};
