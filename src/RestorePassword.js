/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Navbar, Card, Form, InputGroup, Alert, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RestorePassword = () => {
  const [username, setUsername] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [userNoExist, setUserNoExist] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { target: { name, value}} = e;
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
      default:
    }
  }

  function handleSubmit() {}
  
  return (
    <div>
      <Navbar
        className='bg-success justify-content-between'
      >
        <Link className='btn btn-outline-light' to='/'>
          返回
        </Link>
      </Navbar>
      <Card style={{maxWidth: '35em', margin: 'auto'}}>
        <Card.Header>忘记密码</Card.Header>
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
            <Alert
              variant='danger'
              show={userNoExist}
              onClose
            >
            用户名不存在
            </Alert>
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
            <Button 
              variant='success' 
              type='submit' 
              style={{width: '100%'}}
            >
              恢复密码
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

export default RestorePassword;
