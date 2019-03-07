const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/work_diary', { useNewUrlParser: true });

const workDiarySchema = new mongoose.Schema({
  name: String,
  date: String,
  text: String
});

const diaryListModel = mongoose.model('diarylists', workDiarySchema);

async function diaryCreate(name, date, text) {
  return await diaryListModel.create({name: name, date: date, text: text});
}

async function diaryModify(id, name, text) {
  return await diaryListModel.findById(id, (err, res) => {
    if(!err && res.name === name) {
      res.text = text;
      res.save();
    } else {
      console.log(err);
    }
  });
}

async function diaryDelete(id) {
  return await diaryListModel.findByIdAndRemove(id);
}

async function diaryQuery(name) {
  return await diaryListModel.find({},'_id name date text').sort({'_id': -1});
}

const router = express.Router();
router.get('/users', function(req, res, next) {
  const nums = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'e' }];
  res.json(nums);
});

router.post('/diaryList', async function (req, res, next) {
  const name = req.body.name;
  if(name){
    let diaryList = await diaryQuery(name);
    res.json(diaryList);
  }
});

router.post('/diary_create', async function (req, res, next) {
  const { name, date, text } = req.body;
  if(name && date && text) {
    let tmp = await diaryCreate(name, date, text);
    res.json(tmp);
  }
});

router.post('/diary_modify', async function (req, res, next) {
  const { id, name, text } = req.body;
  if(id && name && text) {
    let tmp = await diaryModify(id, name, text);
    res.json(tmp);
  }
});

router.post('/diary_delete', async function (req, res, next) {
  const id = req.body.id;
  if(id) {
    let tmp = await diaryDelete(id);
    res.json(tmp);
  }
});

module.exports = router;
