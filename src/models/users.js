import mongoose from 'mongoose';
import bcrypt from 'bcrypt-as-promised';

const userSchema = new mongoose.Schema({
  name: String,
  address: Object,
});

bcrypt.genSalt(10).then(x => console.log(x));
export default mongoose.model('User', userSchema);
