/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'

const userAuthentication = (username, password) => {
  if(username !== '' && password !== '') {
    return axios.post('/users/authenticate', {
      username: username,
      password: password
    });
  } else {
    return false;
  }
}

export default userAuthentication;
