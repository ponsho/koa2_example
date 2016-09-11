import mongoose from 'mongoose';
import connectionString  from './mongoose_config';

// Models
import User from '../models/users';

mongoose.connect(connectionString);
export default {
  User,
  close() {
    mongoose.disconnect();
  },
};
