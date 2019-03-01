/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import React, { useState } from 'react';
import {
  Alert,
  Button,
  Container,
  Form,
  FormControl,
  Navbar,
  InputGroup,
  Card,
  Modal,
  Row,
  CardColumns,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './bootstrap.min.css';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTimes,
  faUser,
  faKey,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import userAuthentication from './userAuthentication';
import getDiaryList from './getDiaryList';
import diaryCreate from './diaryCreate';
import diaryModify from './diaryModify';
import diaryDelete from './diaryDelete';

library.add(
  faTimes,
  faUser,
  faKey,
)



class NewDiary extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <Button variant="primary" onClick={onClick}>
        新建日志
      </Button>
    );
  }
}

function EditDairy(props) {
  const {
    show,
    onHide,
    dateReadOnly,
    diary_date,
    diary_text,
    onDateChange,
    onTextChange,
    onDiarySubmit,
    index,
  } = props;

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-titl-vcenter">
          <FormControl
            type="date"
            value={diary_date}
            onChange={e => onDateChange(e.target.value)}
            readOnly={dateReadOnly}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          as="textarea"
          aria-label="With textarea"
          rows="10"
          value={diary_text}
          onChange={e => onTextChange(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          取消
        </Button>
        <Button
          variant="success"
          onClick={() => onDiarySubmit(index)}
        >
          提交
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function SearchBar(props) {

  const { onChange, searchPattern, onSearchBarClear } = props;

  function InputGroupAppend() {
    if(!searchPattern) {
      return null;
    } else {
      return (
        <InputGroup.Append>
          <Button 
            // className='btn btn-danger'
            onClick={onSearchBarClear}
          >
            <FontAwesomeIcon
              icon={faTimes}
            />
          </Button>
        </InputGroup.Append>
      );
    }
  }

  return (
    <Form
      inline
      className='searchBarForm'
    >
      <InputGroup
        id='search-area'
      >
        <FormControl
          type="text"
          placeholder="搜索日志"
          name='search'
          value={searchPattern}
          onChange={e => onChange(e)}
        />
        <InputGroupAppend />
      </InputGroup>
    </Form>
  );
}

class BottomBar extends React.Component {
  render() {
    const { sticky, fixed, style } = this.props;
    return (
      <Navbar
        sticky={sticky}
        fixed={fixed}
        style={style}
        expand="lg"
        className="bg-light justify-content-between"
      >
        {this.props.children}
      </Navbar>
    );
  }
}

function UserLoginForm(props) {
  const {
    userLoginFormDisplay,
    onLoginSubmit,
    userName,
    passWord,
    onUserNameChange,
    onPassWordChange,
    loginFailAlert,
    onLoginKeyPress
  } = props;

  return (
    <div style={{ display: userLoginFormDisplay }}>
      <Modal.Header>
        <Modal.Title id="contained-modal-titl-vcenter">登录信息</Modal.Title>
      </Modal.Header>
      <Form
        style={{ width: '60%', margin: 'auto' }}
        onKeyPress={onLoginKeyPress}
      >
        <Form.Group as={Row} controlId="form-control-plaintext">
          <Form.Label column sm={3} />
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon
                  icon={['fas', 'user']}
                  fixedWidth
                />
              </InputGroup.Text>
            </InputGroup.Prepend>            
            <Form.Control
              type="text"
              placeholder="请输入用户名"
              required
              value={userName}
              onChange={e => onUserNameChange(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group as={Row} controlId="form-control-plaintext">
          <Form.Label column sm={3} />
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon
                  icon={['fas','key']}
                  fixedWidth
                />
              </InputGroup.Text>
            </InputGroup.Prepend> 
            <Form.Control
              type="password"
              placeholder="请输入密码"
              required
              value={passWord}
              onChange={e => onPassWordChange(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <Alert variant='danger' show={loginFailAlert} onClose>用户名或密码错误！</Alert>
        <Form.Group controlId="formBasicLink" className="text-center">
          <Link to="/signup">注册</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/restore_password">忘记密码</Link>
        </Form.Group>

      </Form>
      <div
        style={{ width: '70%', margin: '0 auto 1em'}}
      >
        <Button
          variant="success"
          type="submit"
          onClick={onLoginSubmit}
          style={{ width: '100%' }}
        >
          登录
        </Button>
      </div>
    </div>
  );
}

class LoginWindow extends React.Component {
  render() {
    const {
      loginShow,
      onHide,
      onLoginSubmit,
      userName,
      passWord,
      onUserNameChange,
      onPassWordChange,
      authentication,
      onLogout,
      loginFailAlert,
      onLoginKeyPress
    } = this.props;

    let userLoginFormDisplay, userInfoFormDisplay;

    if (!authentication) {
      userLoginFormDisplay = 'block';
      userInfoFormDisplay = 'none';
    } else {
      userLoginFormDisplay = 'none';
      userInfoFormDisplay = 'block';
    }

    return (
      <Modal
        show={loginShow}
        onHide={onHide}
        size="lg"
        dialogClassName="modal-90w"
        backdrop="static"
        centered="true"
      >
        <UserLoginForm
          onHide={onHide}
          onLoginSubmit={onLoginSubmit}
          userLoginFormDisplay={userLoginFormDisplay}
          userName={userName}
          passWord={passWord}
          onUserNameChange={onUserNameChange}
          onPassWordChange={onPassWordChange}
          loginFailAlert={loginFailAlert}
          onLoginKeyPress={onLoginKeyPress}
        />
        <UserInfoForm
          onHide={onHide}
          userInfoFormDisplay={userInfoFormDisplay}
          userName={userName}
          onLogout={onLogout}
        />
      </Modal>
    );
  }
}

class UserInfoForm extends React.Component {
  render() {
    const { onLogout, onHide, userInfoFormDisplay, userName } = this.props;
    return (
      <div style={{ display: userInfoFormDisplay }}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-titl-vcenter">登录信息</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            当前登录用户:&nbsp;
            {userName}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onLogout}>
            登出
          </Button>
          <Button variant="success" onClick={onHide}>
            关闭
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

function DiaryCard(props) {
  const {
    editable,
    diary,
    onDiaryModifying,
    onDiaryDelete,
    searchPattern
  } = props;

  function highlight(line, pattern) {
    const line_list = line.split(pattern);
    let line_list_show = [];
    for(let n = 0; n < line_list.length; n++) {
      if(n === 0) {
        line_list_show.push(line_list[n]);
      } else {
        line_list_show.push(
          <span>
            <span style={{background: '#28a745', color: 'white'}}>
              {searchPattern}
            </span>
            {line_list[n]}
          </span>
        )
      }
    }
    return line_list_show;
  }

  let { name, date, text } = diary;
  let card_show = 'd-block';

  if(searchPattern) {
    if(card_show === 'd-block') {
      card_show = 'd-none';
    }
    if(date.includes(searchPattern)) {
      if(card_show === 'd-none') {
        card_show = 'd-block';
      }
      const date_list_show = highlight(date, searchPattern);
      date = (
        <span>
          {date_list_show}
        </span>
      );
    } else {
      date = (
        <span>
          {date}
        </span>
      );
    }

    if(name.includes(searchPattern)) {
      if(card_show === 'd-none') {
        card_show = 'd-block';
      }
      const name_list_show = highlight(name, searchPattern);
      name = (
        <span>
          {name_list_show}
        </span>
      );
    } else {
      name = (
        <span>
          {name}
        </span>
      );
    }

    const lineList = text.split('\n');
    text = (
      <Card.Body>
        {lineList.map((line,index) => {
          if(line.includes(searchPattern)) {
            if(card_show === 'd-none') {
              card_show = 'd-block';
            }
            const line_text_list = line.split(searchPattern);
            let line_text_list_show = [];
            for(let n = 0; n < line_text_list.length; n++) {
              if(n === 0) {
                line_text_list_show.push(line_text_list[n]);
              } else {
                line_text_list_show.push(
                  <span>
                    <span style={{background: '#28a745', color: 'white'}}>
                      {searchPattern}
                    </span>
                    {line_text_list[n]}
                  </span>
                )
              }
            }

            return (
              <article>
                <span>
                  {line_text_list_show}
                </span>
                <br />
              </article>
            );
          } else {
            return (
              <article key={index}>
                {line}
                <br />
              </article>
            );
          }
        })}
      </Card.Body>
    );
  } else {
    if(card_show === 'd-none') {
      card_show = 'd-block';
    }
    date = (
      <span>
        {date}
      </span>
    );
    name = (
      <span>
        {name}
      </span>
    );
    const lineList = text.split('\n');
    text = (
      <Card.Body>
        {lineList.map((line,index) =>
          (
            <article key={index}>
              {line}
              <br />
            </article>
          )
        )}
      </Card.Body>
    );
  }

  return (
    <Card className={card_show}>
      <Card.Header as="h5">
        {date}
(
        {name}
)
        <span className="float-right" style={{display: editable}}>
          <Button
            variant="danger"
            size="sm"
            className="mr-2"
            onClick={onDiaryDelete}
          >
            删除
          </Button>
          <Button
            variant="success"
            size="sm"
            className="rounded"
            onClick={onDiaryModifying}
          >
            修改
          </Button>
        </span>
      </Card.Header>
      {text}
    </Card>
  );
}

class HomePage extends React.Component {
  render() {
    const onClick = this.props.onClick;
    let img_src;
    img_src = !this.props.loginShow ? '/home_active.svg' : '/home.svg';
    return (
      <img src={img_src} alt="HOME" title="首页" width="40" onClick={onClick} />
    );
  }
}

class Person extends React.Component {
  render() {
    const onClick = this.props.onClick;
    let img_src;
    img_src = this.props.loginShow ? '/user_active.svg' : '/user.svg';
    return (
      <img
        src={img_src}
        alt="PROFILE"
        title="我的"
        width="40"
        onClick={onClick}
      />
    );
  }
}

function DiaryCardList(props) {
  const { diaryList, onDiaryModifying, onDiaryDelete, searchPattern } = props;
  const dateToday = date_today();
  let d2 = Date.parse(dateToday);
  let diaryCardList = diaryList.map((diary, index) => {
    let d1 = Date.parse(diary.date);
    if (d1 >= d2 || index === 0) {
      return (
        <DiaryCard
          key={diary._id}
          editable="show"
          diary={diary}
          onDiaryModifying={() => onDiaryModifying(index)}
          onDiaryDelete={() => onDiaryDelete(index)}
          searchPattern={searchPattern}
        />
      );
    } else {
      return (
        <DiaryCard
          key={diary._id}
          editable="none"
          diary={diary}
          onDiaryModifying={() => onDiaryModifying(index)}
          onDiaryDelete={() => onDiaryDelete(index)}
          searchPattern={searchPattern}
        />
      );
    }
  });

  return <CardColumns style={{columnCount: '1'}}>{diaryCardList}</CardColumns>;
}

class DiaryPlatform extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      modalShow: false,
      diaryDate: '',
      diaryText: '',
      loginShow: false,
      userName: '',
      passWord: '',
      authentication: false,
      diaryList: [],
      modifiedShow: false,
      loginFailAlert: false,
      searchPattern: ''
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleNewDiaryClick = this.handleNewDiaryClick.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePassWordChange = this.handlePassWordChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.isScrollAtBottom = this.isScrollAtBottom.bind(this);
    this.handleDirayModifying = this.handleDirayModifying.bind(this);
    this.handleDiaryDelete = this.handleDiaryDelete.bind(this);
    this.handleDiarySubmit = this.handleDiarySubmit.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.handleSearchBarClear = this.handleSearchBarClear.bind(this);
    this.handleLoginKeyPress = this.handleLoginKeyPress.bind(this);
  }

  componentDidMount() {
    let myStorage = window.localStorage;
    const userName = myStorage.getItem('userName');
    const passWord = myStorage.getItem('passWord');
    if(userName !== null && passWord !== null) {
      userAuthentication(userName, passWord)
      .then(res => {
        if(res.status === 200) {
          myStorage.setItem('authToken', res.data.token);
          this.setState({
            userName: userName,
            passWord: passWord,
            authentication: true,
          });
          getDiaryList(userName, res.data.token)
          .then(res => {
            this.setState({diaryList: res.data});
          });
        }
      });
    } else {
      this.setState({
        loginShow: true,
        authentication: false});
    }
  }

  onDateChange(date) {
    this.setState({
      diaryDate: date
    });
  }

  onTextChange(text) {
    this.setState({
      diaryText: text
    });
  }

  onSearchTextChange(e) {
    this.setState({searchPattern: e.target.value});
  }
  
  handleSearchBarClear() {
    this.setState({searchPattern: ''});
  }

  handleUserClick() {
    this.setState({
      loginShow: true
    });
  }

  handleHomeClick() {
    if (this.state.authentication) {
      this.setState({
        loginShow: false
      });
    } else {
      this.setState({
        loginShow: false,
        userName: '',
        passWord: ''
      });
    }
  }

  handleUserNameChange(userName) {
    this.setState({
      userName: userName
    });
    if(this.state.loginFailAlert) {
      this.setState({loginFailAlert: false})
    }
  }

  handlePassWordChange(passWord) {
    this.setState({
      passWord: passWord
    });
    if(this.state.loginFailAlert) {
      this.setState({loginFailAlert: false})
    }
  }

  handleLoginSubmit() {
    const userName = this.state.userName;
    const passWord = this.state.passWord;
    if(userName !== '' && passWord !== '') {
      userAuthentication(userName, passWord)
      .then(res => {
        if(res.status === 200) {
          window.localStorage.setItem('authToken', res.data.token);
          this.setState({authentication: true});
          getDiaryList(userName)
          .then(res => {
            this.setState({
              diaryList: res.data
            });
          });
          localStorage.setItem('userName', userName);
          localStorage.setItem('passWord', passWord);
        }
      }).catch(err => {
        if(err.response.status === 400) {
          this.setState({loginFailAlert: true});
        } else {
          alert(err.response.data.message);
        }
      });
    }
  } 

  handleLogout() {
    localStorage.clear();
    this.setState({
      authentication: false,
      userName: '',
      passWord: '',
      diaryList: [],
    });
  }

  isScrollAtBottom() {
    let scrollTop = document.documentElement.scollTop;
    let windowHeight = document.body.clientHeight;
    let scrollHeight = document.documentElement.scrollHeight;
    if (scrollTop === windowHeight + scrollHeight) {
      return true;
    } else {
      return false;
    }
  }

  handleDirayModifying(index) {
    if(this.state.authentication &&
      this.state.userName !== '' &&
      this.state.passWord !== '') {
        this.modifiedIndex = index;
        this.setState(prevState => {
          let date = prevState.diaryList[index].date;
          let text = prevState.diaryList[index].text;
          return {
            modifiedShow: true,
            diaryDate: date,
            diaryText: text
          };
        });
    } else {
      this.setState({loginShow: true, authentication: false});
    }
  }

  handleDiaryDelete(index) {
    if(this.state.authentication &&
      this.state.userName !== '' &&
      this.state.passWord !== '') {
        let id = this.state.diaryList[index]._id,
          name = this.state.userName;
        diaryDelete(id)
        .then(getDiaryList(name)
          .then(res => this.setState({diaryList: res.data})));
    } else {
      this.setState({loginShow: true, authentication: false});
    }
  }

  handleDiarySubmit(index) {
    if (typeof index !== 'undefined') {
      let id = this.state.diaryList[index]._id,
        text = this.state.diaryText,
        name = this.state.userName;
      if(!name || !text) {
        alert('不允许提交空日志！')
      } else {
        diaryModify(id, text)
        .then(() => {
          getDiaryList(name)
          .then(res => this.setState({diaryList: res.data}));})
        .then(
          this.setState({
            diaryDate: '',
            diaryText: '',
            modifiedShow: false
          })
        );
      }
    } else {
      let name = this.state.userName,
          date = this.state.diaryDate,
          text = this.state.diaryText;
      if(!name || !date || !text) {
        alert('不允许提交空日志！')
      } else {
        diaryCreate(name, date, text)
        .then(() => {
          getDiaryList(name)
          .then(res =>
            this.setState({
              diaryList: res.data,
              diaryDate: '',
              diaryText: '',
              modalShow: false
            }));
        });
      }
    }
  }

  handleLoginKeyPress(e) {
    if(e.key === 'Enter') {
      this.handleLoginSubmit();
    }
  }

  handleClose() {
    this.setState({
      modalShow: false
    });
  }

  handleNewDiaryClick() {
    if(this.state.authentication &&
      this.state.userName !== '' &&
      this.state.passWord !== '') {
        const dateToday = date_today();
        this.setState({
          modalShow: true,
          diaryDate: dateToday
        });
    } else {
      this.setState({loginShow: true, authentication: false});
    }
  }

  render() {
    return (
      <Container>
        <Navbar sticky="top" style={{height: '3.5em'}} />
        <Navbar
          fixed="top"
          expand="sm"
          className="bg-success justify-content-sm-between"
        >
          <SearchBar
            onChange={this.onSearchTextChange}
            searchPattern={this.state.searchPattern}
            onSearchBarClear={this.handleSearchBarClear}
          />
          <NewDiary
            onClick={this.handleNewDiaryClick}
          />
        </Navbar>      
        <EditDairy
          show={this.state.modalShow}
          onHide={this.handleClose}
          diary_date={this.state.diaryDate}
          diary_text={this.state.diaryText}
          onDateChange={this.onDateChange}
          onTextChange={this.onTextChange}
          onDiarySubmit={this.handleDiarySubmit}
        />
        <EditDairy
          show={this.state.modifiedShow}
          onHide={() =>
            this.setState({
              modifiedShow: false,
              diaryDate: '',
              diaryText: ''
            })
          }
          diary_date={this.state.diaryDate}
          diary_text={this.state.diaryText}
          onDateChange={this.onDateChange}
          onTextChange={this.onTextChange}
          onDiarySubmit={this.handleDiarySubmit}
          index={this.modifiedIndex}
          dateReadOnly
        />
        <DiaryCardList
          diaryList={this.state.diaryList}
          onDiaryModifying={this.handleDirayModifying}
          onDiaryDelete={this.handleDiaryDelete}
          searchPattern={this.state.searchPattern}
        />

        <LoginWindow
          loginShow={this.state.loginShow}
          onHide={this.handleHomeClick}
          onLoginSubmit={this.handleLoginSubmit}
          onUserNameChange={this.handleUserNameChange}
          onPassWordChange={this.handlePassWordChange}
          userName={this.state.userName}
          passWord={this.state.passWord}
          authentication={this.state.authentication}
          onLogout={this.handleLogout}
          loginFailAlert={this.state.loginFailAlert}
          onLoginKeyPress={this.handleLoginKeyPress}
        />
        <Navbar sticky="bottom" style={{height: '3.5em'}} />
        <BottomBar fixed="bottom" style={{ margin: 'auto' }}>
          <HomePage
            loginShow={this.state.loginShow}
            onClick={this.handleHomeClick}
          />
          <Person
            loginShow={this.state.loginShow}
            onClick={this.handleUserClick}
          />
        </BottomBar>
      </Container>
    );
  }
}

function App() {
  return <DiaryPlatform />;
}

export default App;

function date_today() {
  const date =  new Date();
  const year = date.getFullYear();
  let month = String(parseInt(date.getMonth()) + 1);
  let day = date.getDate();
  if(parseInt(month) < 10) {
    month = `0${month}`;
  }
  if(parseInt(day) < 10) {
    day = `0${day}`;
  }
  return year + '-' + month + '-' + day;
}
