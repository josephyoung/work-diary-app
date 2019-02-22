import React from 'react';
import { Card } from 'react-bootstrap';
import './bootstrap.min.css';

const RestorePassword = (props) => {
  return (
    <div>
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
