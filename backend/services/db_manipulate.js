const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/work_diary');

const workDiarySchema = new mongoose.Schema({
  name: String,
  date: String,
  text: String
});

const diaryListModel = mongoose.model('diaryList', workDiarySchema);

module.exports = async function diaryCreate(name, date, text) {
  return await diaryListModel.create({name: name, date: date, text: text});
}

module.exports = async function diaryModify(id, text) {
  return diaryListModel.findById(id);
}

module.exports = async function diaryDelete(id) {
  return await diaryListModel.findByIdAndRemove(id);
}

module.exports = async function diaryQuery(name) {return await diaryListModel.find({name: name},'_id name date text');}


