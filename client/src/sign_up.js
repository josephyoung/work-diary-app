/* eslint-disable no-console */
import React, { useState } from 'react';
import { Alert, Navbar, Card, InputGroup, Form, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [pwCheckFail, setPwCheckFail] = useState(false);
  const [userExisted, setUserExisted] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if(password === repeatPassword) {
      await axios.post('/users/register',
        { username, password, question, answer })
        .then(() => setSuccess(true))
        .catch(err => {
          if(err.response.status === 400) {
            setUserExisted(true);
          } else {
            alert(err.message);
          }
        });
    } else {
      setPwCheckFail(true);
    }
  }
  
  const handleChange = (e) => {
    const { target: { name, value }} = e;
    switch(name) {
      case 'username':
        setUsername(value);
        if(userExisted) {
          setUserExisted(false);
        }
        break;
      case 'password':
        setPassword(value);
        if(pwCheckFail) {
        setPwCheckFail(false);
        }
        break;
      case 'repeatPassword':
        setRepeatPassword(value);
        if(pwCheckFail) {
        setPwCheckFail(false);
        }
        break;
      case 'question':
        setQuestion(value);
        break;
      case 'answer':
        setAnswer(value);
        break;
      default:
    }
  }

  return (
    <div>
      <Navbar
        className='bg-success justify-content-between'
        fixed='top'
      >
        <Link 
          className='btn btn-outline-light' 
          to='/'
        >
          返回
        </Link>
      </Navbar>
      <Card style={{maxWidth: '35em', margin: 'auto'}}>
        <Card.Header>账号注册</Card.Header>
        <Card.Body className={success ? 'd-none' : 'd-block'}>
          <Form
            style={{ width: '80%', margin: 'auto' }}
            onSubmit={handleSubmit}
          >
            <Form.Group
              as={Row}
              controlId="form-control-plaintext"
            >
              <Form.Label column>
                用户名：
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
            <Alert
              variant='danger'
              show={userExisted}
              onClose
            >
              用户
              {username}
              已存在
            </Alert>
            <Form.Group 
              as={Row} 
              controlId="form-control-plaintext"
            >
              <Form.Label column>
                密码：
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
                确认密码：
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type='password'
                  name='repeatPassword'
                  value={repeatPassword}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Alert
              variant='danger' 
              show={pwCheckFail}
              onClose
            >
            两次密码输入不一致
            </Alert>
            <Form.Group 
              as={Row} 
              controlId="form-control-plaintext"
            >
              <Form.Label column>
                密码提示问题：
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
                密码提示问题答案：
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
            <Button 
              variant='success' 
              type='submit' 
              style={{width: '100%'}}
            >
              注册
            </Button>
          </Form>
        </Card.Body>
        <Card.Body className={success ? 'd-block' : 'd-none'}>
          <Card.Text className='alignText-center'>
            恭喜, 
            {username} 
            注册成功！
          </Card.Text>
          <Link
            className='btn btn-success'
            style={{width: '100%'}}
            to='/'
          >
            返回登录
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}



export default SignUp;
