import mongoose from 'mongoose';
// Configure Mongoose to use Node promises.
// By default mongoose use a promise implementation
// that doesn't handle errors.
// http://mongoosejs.com/docs/promises.html
mongoose.Promise = Promise;

export default mongoose;
