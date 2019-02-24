import React from 'react';
import { Navbar, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SignUp = (props) => {
  return (
    <div>
      <Navbar
        className='bg-primary justify-content-between'
      >
        <Link className='btn btn-outline-light' to='/'>
          返回
        </Link>
      </Navbar>
      <Card>
        <Card.Header>账号注册</Card.Header>
        <Card.Body>
          <Card.Text>
            姓名
            <br/>
            密码
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SignUp;
