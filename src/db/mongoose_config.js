import config from 'config';
import mongoose from 'mongoose';
// Configure Mongoose to use Node promises.
// By default mongoose use a promise implementation
// that doesn't handle errors.
// http://mongoosejs.com/docs/promises.html
mongoose.Promise = Promise;

const dbHost = config.get('mongodb.host');
const dbPort = config.get('mongodb.port');
const dbName = config.get('mongodb.dbName');

const connectionString = `mongodb://${dbHost}:${dbPort}/${dbName}`;

export default connectionString;

