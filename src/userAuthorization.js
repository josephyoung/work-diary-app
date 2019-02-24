/* eslint-disable no-unused-vars */
const userAuthorization = (userName, passWord) => {
  return userName !== '' && passWord !== ''
    ? true
    : false;
}

export default userAuthorization;
