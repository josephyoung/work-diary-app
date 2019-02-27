import axios from 'axios';

export default function getDiaryList(name, date, text) {
  return axios.post('/api/diary_create', {name: name, date: date, text: text});
}
