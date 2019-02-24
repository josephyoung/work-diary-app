const post = (data) => {
  let oReq = new XMLHttpRequest();
  let result;

  oReq.open('POST', '/login', false);
  oReq.setRequestHeader('Content-type', 'application/json');
  oReq.onreadystatechange = () => {
    if (oReq.readyState === 4 && oReq.statu === 200) {
      const json = JSON.parse(oReq.responseText);
      result = json.authentication;
    }
  }
  oReq.send(JSON.stringify(data));

  return result;
}

export default post;
