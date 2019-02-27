import axios from 'axios';

export default function diaryDelete(id) {
  return axios.post('/api/diary_delete', {id: id});
}
