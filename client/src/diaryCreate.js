import axios from 'axios';

export default async function getDiaryList(name, date, text) {
  let auth_token = window.localStorage.getItem('authToken');
  return await axios({
    method: 'post',
    url: '/api/diary_create',
    data: {name: name, date: date, text: text},
    headers: {'Authorization': 'Bearer ' + auth_token}
  });
}
