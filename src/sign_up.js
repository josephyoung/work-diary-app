import React from 'react';
import { Card } from 'react-bootstrap';
import './bootstrap.min.css';

const SignUp = (props) => {
  return (
    <div>
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
