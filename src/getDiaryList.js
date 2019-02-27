/* eslint-disable no-console */
import axios from 'axios';

export default function getDiaryList(name) {
  return axios.post('/api/diaryList', {name: name})
}
