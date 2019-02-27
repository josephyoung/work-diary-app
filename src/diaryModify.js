import axios from 'axios';

export default function diaryModify(id, text) {
  return axios.post('/api/diary_modify', {id: id, text: text});
}
