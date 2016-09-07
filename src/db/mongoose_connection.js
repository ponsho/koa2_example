import mongoose from './db_config';

// Models
import User from '../models/users';



const url = 'mongodb://localhost:27017/test';
mongoose.connect(url);
export default {
  User,
  close() {
    mongoose.disconnect();
  },
};
