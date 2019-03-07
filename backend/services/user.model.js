const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  username: {type: String, unique: true, required: true},
  hash: {type: String, required: true},
  question: {type: String, required: true},
  answerHash: {type: String, required: true},
  createdDate: {type: Date, default: Date.now}
});

schema.indexes();

module.exports = mongoose.model('users', schema);
