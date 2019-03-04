import axios from 'axios';

export default async function getDiaryList(name) {
  let auth_token = window.localStorage.getItem('authToken');
  return await axios({
    method: 'post',
    url: '/api/diaryList',
    data: {name: name},
    headers: {
      'Authorization': 'Bearer ' + auth_token,
     }
});
}
