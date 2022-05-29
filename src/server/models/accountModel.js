import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const URI = 'mongodb+srv://pakachan:aEMtuk4JhAmfigw@cluster0.qvt4k.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'userAccounts'});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));

const userAccount = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
});

export default mongoose.model('newUser', userAccount);

// module.exports = mongoose.model('newUser', userAccount);