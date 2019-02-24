/* eslint-disable no-unused-vars */
const userAuthentication = (userName, passWord) => {
  return userName !== '' && passWord !== ''
    ? true
    : false;
}

export default userAuthentication;
