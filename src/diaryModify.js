import axios from 'axios';

export default async function diaryModify(id, text) {
  let auth_token = window.localStorage.getItem('authToken');
  return await axios({
    method: 'post',
    url: '/api/diary_modify',
    data: {id: id, text: text},
    headers: {'Authorization': 'Bearer ' + auth_token}
  });
}
