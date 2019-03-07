/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Navbar, Card, Form, InputGroup, Alert, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RestorePassword = () => {
  const [username, setUsername] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [idError, setIdError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [token, setToken] = useState('');
  const [changeSuccess, setChangeSuccess] = useState(false);

  const handleChange = (e) => {
    const { target: { name, value}} = e;
    if(idError) {
      setIdError(false);
    }
    switch(name) {
      case 'username':
        setUsername(value);
        break;
      case 'question':
        setQuestion(value);
        break;
      case 'answer':
        setAnswer(value);
        break;
      case 'password':
        setPassword(value);
        if(passwordCheck) {
          setPasswordCheck(false);
        }
        break;
      case 'passwordRepeat':
        setPasswordRepeat(value);
        if(passwordCheck) {
          setPasswordCheck(false);
        }
        break;
      default:
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let auth_token = await forgetPassword(username, question, answer);
      setToken(auth_token);
      setSuccess(true);
    } catch (error) {
      setIdError(true);
    }
  }
  
  async function handleChangePassword(e) {
    e.preventDefault();
    if (password === passwordRepeat) {
      if (username && token) {
        try {
          if(await changePassword(username, password, token)) {
            setChangeSuccess(true);
            return true;
          }
        } catch (error) {
          return false;
        }
      }
    } else {
      setPasswordCheck(true);
      return false;
    }
  }

  return (
    <div>
      <Navbar
        className='bg-success justify-content-between'
      >
        <Link className='btn btn-outline-light' to='/'>
          返回
        </Link>
      </Navbar>
      <Card
        style={{maxWidth: '35em', margin: 'auto'}}
        className={success ? 'd-none' : 'd-block'}
      >
        <Card.Header>忘记密码</Card.Header>
        <Card.Body >
          <Form
            style={{ width: '80%', margin: 'auto' }}
            onSubmit={handleSubmit}
          >
            <Form.Group
              as={Row}
              controlId="form-control-plaintext"
            >
              <Form.Label column>
                输入您的用户名：
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type='text'
                  required
                  name='username'
                  value={username}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group 
              as={Row} 
              controlId="form-control-plaintext"
            >
              <Form.Label column>
                输入您当时记录的提示问题：
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type='text'
                  name='question'
                  value={question}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group 
              as={Row} 
              controlId="form-control-plaintext"
            >
              <Form.Label column>
                输入您的答案：
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type='text'
                  name='answer'
                  value={answer}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Alert
              variant='danger'
              show={idError}
              onClose
            >
            用户名错误或者提示问题和答案错误，请检查后重新输入
            </Alert>
            <Button 
              variant='success' 
              type='submit' 
              style={{width: '100%'}}
            >
              恢复密码
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Card
        style={{maxWidth: '35em', margin: 'auto'}}
        className={(success && !changeSuccess) ? 'd-block' : 'd-none'}
      >
        <Card.Header>
          {username}
          ：重设密码
        </Card.Header>
        <Card.Body>
          <Form
            style={{ width: '80%', margin: 'auto' }}
            onSubmit={handleChangePassword}
          >
            <Form.Group 
              as={Row} 
              controlId="form-control-plaintext"
            >
              <Form.Label column>
                新密码：
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type='password'
                  name='password'
                  value={password}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group 
              as={Row} 
              controlId="form-control-plaintext"
            >
              <Form.Label column>
                再次输入密码：
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type='password'
                  name='passwordRepeat'
                  value={passwordRepeat}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Alert
              variant='danger'
              show={passwordCheck}
              onClose
            >
              两次密码输入不一致
            </Alert>
            <Button
              type='submit'
              variant='success'
              style={{width: '100%'}}
            >
              重设密码
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Card
        style={{maxWidth: '35em', margin: 'auto'}}
        className={changeSuccess ? 'd-block' : 'd-none'}
      >
        <Card.Header>
          密码恢复成功
        </Card.Header>
        <Card.Body>
          <Link
            className='btn btn-success'
            to='/'
            style={{width: '100%'}}
          >
          返回登录
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RestorePassword;

async function forgetPassword(username, question, answer) {
  try {
    const res = await axios.post('/users/forget', {
      username: username,
      question: question,
      answer: answer
    });
    if(res.status === 200) {
      return res.data.token;
    } else {
      return res.data;
    }
  } catch (err) {
    throw err;
  }
}

async function changePassword(username, password, token) {
  try {
    const res = await axios({
      method: 'post',
      url: '/users/restore', 
      data: {
        username: username,
        password: password
      },
      headers: {'Authorization': 'Bearer ' + token}
    });
    if(res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
}
