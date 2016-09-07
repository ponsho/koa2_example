import mongoose from 'mongoose';
import { hashWithSalt, compare } from '../lib/utils/crypto/bcrypt';
import jwt from 'jsonwebtoken'

const User = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String }
});


// Middleware
const hashPassword = async function (next) {
  const aboutToSaveUser = this;
  //  Only hash the pw if the password was modified.
  //  For a new in memory user:
  //        isModified('password') will return true
  if (!aboutToSaveUser.isModified('password')) {
    return next();
  }
  const plainPw = aboutToSaveUser.password;
  aboutToSaveUser.password = await hashWithSalt(plainPw);
  next();
};



User.pre('save', hashPassword);


User.methods.validatePassword = async function(password) {
  const user = this;
  return await compare(password,user.password);
};

User.methods.generateToken = function() {
  const user = this;
  return jwt.sign({id: user.id}, 'myToken');
};

export default mongoose.model('user', User);
