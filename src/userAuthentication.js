/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'

const userAuthentication = (username, password) => {
  if(username !== '' && password !== '') {
    return axios.post('/api/users/authenticate', {
      username: username,
      password: password
    }).auth;
  } else {
    return false;
  }
}

export default userAuthentication;
