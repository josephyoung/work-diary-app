import axios from 'axios';

export default async function diaryDelete(id) {
  let auth_token = window.localStorage.getItem('authToken');
  return await axios({
    method: 'post',
    url: '/api/diary_delete',
    data: {id: id},
    headers: {'Authorization': 'Bearer ' + auth_token}
  });
}
