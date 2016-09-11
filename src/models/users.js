import mongoose from 'mongoose';
import 'mongoose-type-email';
import { hashWithSalt, compare } from '../lib/utils/crypto/crypt';

const User = new mongoose.Schema({
  facebook: {
    id: { type: String },
  },
  google: {
    id: { type: String }
  },
  email: { type: mongoose.SchemaTypes.Email, unique: true },
  password: { type: String },
});

// Middleware
async function hashPassword(next) {
  const aboutToSaveUser = this;
  //  Only hash the pw if the password was modified.
  //  For a new in memory user:
  //        isModified('password') will return true
  if (!aboutToSaveUser.isModified('password')) {
    return next();
  }
  const plainPw = aboutToSaveUser.password;
  aboutToSaveUser.password = await hashWithSalt(plainPw);
  return next();
}

User.pre('save', hashPassword);

User.methods.verifyPassword = async function validatePassword(password) {
  const user = this;
  return await compare(password, user.password);
};

// User.methods.generateToken = function() {
//   const user = this;
//   return jwt.sign({id: user.id}, 'myToken');
// };

export default mongoose.model('user', User);
