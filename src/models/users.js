import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    address: Object,
});

export default mongoose.model('User', userSchema);