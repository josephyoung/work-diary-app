import React from 'react';
import { Navbar, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './bootstrap.min.css';

const RestorePassword = (props) => {
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
        <Card.Header>恢复密码</Card.Header>
        <Card.Body>
          <Card.Text>
            姓名
            <br/>
            密码提示问题
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RestorePassword;
