import mongoose from 'mongoose';
import 'dotenv/config';

const Schema = mongoose.Schema;

const URI = process.env.MONGO_URI;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'userAccounts'})
.then((console.log('Successfully connected to MongoDB')))
.catch((error) => {
  console.log("Database connection failed. exiting now...");
  console.error(error);
  process.exit(1);
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));

const userAccount = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
});

export default mongoose.model('newUser', userAccount);

// module.exports = mongoose.model('newUser', userAccount);