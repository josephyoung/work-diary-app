/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
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
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSearch,
  faUser,
  faKey
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(
  faSearch,
  faUser,
  faKey
)

class NewDiary extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <Button variant="success" onClick={onClick}>
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
    <Modal show={show} onHide={onHide} backdrop="static">
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
        <Button variant="success" onClick={() => onDiarySubmit(index)}>
          提交
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

class SearchBar extends React.Component {
  render() {
    return (
      <Form inline style={{maxWidth: '60%'}}>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="搜索日志"

          />
          <InputGroup.Append>
            <Button variant="outline-light">
              <FontAwesomeIcon
                icon={['fas', 'search']}
              />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    );
  }
}

class NavigateBar extends React.Component {
  render() {
    return (
      <Navbar
        fixed="top"
        expand="sm"
        className="bg-primary justify-content-sm-between"
      >
        {this.props.children}
      </Navbar>
    );
  }
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

class UserLoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alertShow: false,
    }
  }

   handleSubmit = () => {
    const { onLoginSubmit, authorization } = this.props;
    onLoginSubmit();
    if(!authorization) {
      this.setState({alertShow: true});
    }
  }

  render() {
    const {
      onHide,
      userLoginFormDisplay,
      userName,
      passWord,
      onUserNameChange,
      onPassWordChange,
    } = this.props;

    return (
      <div style={{ display: userLoginFormDisplay }}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-titl-vcenter">登录信息</Modal.Title>
        </Modal.Header>
        <Form style={{ width: '60%', margin: 'auto' }}>
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
          <Alert variant='danger' show={this.state.alertShow}>用户名或密码错误！</Alert>
          <Form.Group controlId="formBasicLink" className="text-center">
            <Link to="/signup">注册</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/restore_password">忘记密码</Link>
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="danger" onClick={onHide}>
            取消
          </Button>
          <Button variant="success" type="submit" onClick={this.handleSubmit}>
            登录
          </Button>
        </Modal.Footer>
      </div>
    );
  }
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
      authorization,
      onLogout
    } = this.props;

    let userLoginFormDisplay, userInfoFormDisplay;

    if (!authorization) {
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

class DiaryCard extends React.Component {
  render() {
    const { editable, diary, onDiaryModifying, onDiaryDelete } = this.props;
    const { name, date, text } = diary;
    const textList = text.split('\n');
    const textListhtml = (
      <Card.Body>
        {textList.map((text,index) => (
          <article key={index}>
            {text}
            <br />
          </article>
        ))}
      </Card.Body>
    );
    
    return (
      <Card>
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
        {textListhtml}
      </Card>
    );
  }
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

const diaryList = [
  {
    index: 0,
    name: '张三',
    date: '2019-02-18',
    text:
      '1. Lorem ipsum dolor . \n2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex labore perspiciatiso.'
  },
  {
    index: 1,
    name: '张三',
    date: '2019-02-19',
    text:
      '1. Lorem ipsum dolor . \n2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex labore perspiciatiso.'
  },
  {
    index: 2,
    name: '张三',
    date: '2019-02-18',
    text:
      '1. Lorem ipsum dolor . \n2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex labore perspiciatiso.'
  },
  {
    index: 3,
    name: '张三',
    date: '2019-02-17',
    text:
      '1. Lorem ipsum doloam, doloremque. \n2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga laboriosres ad. \n3. Lorem ipsum dolor sit alor beatae quisquam alia.'
  },
  {
    index: 4,
    name: '张三',
    date: '2019-02-21',
    text:
      '1. t consectetur adipisicing elit. A sequi perspiciatis quo fugi \n2. Temporibus expedita tempore modi ex nemo. Ipsa prehenderit perferendis inventore eveniet, nihil? \n3. Accusantium nulla corporis, commodi aliquam ullam laborum eius \n4. Deleagni modi cum! Soluta, doloribus!'
  },
  {
    index: 5,
    name: '张三',
    date: '2019-02-22',
    text:
      '1. t consectetur adipisicing elit. A sequi perspiciatis quo fugi \n2. Temporibus expedita tempore modi ex nemo. Ipsa prehenderit perferendis inventore eveniet, nihil? \n3. Accusantium nulla corporis, commodi aliquam ullam laborum eius \n4. Deleagni modi cum! Soluta, doloribus!'
  },
  {
    index: 6,
    name: '张三',
    date: '2019-02-14',
    text:
      '1. t consectetur adipisicing elit. A sequi perspiciatis quo fugi \n2. Temporibus expedita tempore modi ex nemo. Ipsa prehenderit perferendis inventore eveniet, nihil? \n3. Accusantium nulla corporis, commodi aliquam ullam laborum eius \n4. Deleagni modi cum! Soluta, doloribus!'
  },
  {
    index: 7,
    name: '张三',
    date: '2019-02-13',
    text:
      '1. t consectetur adipisicing elit. A sequi perspiciatis quo fugi 2. Temporibus expedita tempore modi ex nemo. Ipsa prehenderit perferendis inventore eveniet, nihil? 3. Accusantium nulla corporis, commodi aliquam ullam laborum eius 4. Deleagni modi cum! Soluta, doloribus!'
  },
  {
    index: 8,
    name: '张三',
    date: '2019-02-12',
    text:
      '1. t consectetur adipisicing elit. A sequi perspiciatis quo fugi 2. Temporibus expedita tempore modi ex nemo. Ipsa prehenderit perferendis inventore eveniet, nihil? 3. Accusantium nulla corporis, commodi aliquam ullam laborum eius 4. Deleagni modi cum! Soluta, doloribus!'
  },
  {
    index: 9,
    name: '张三',
    date: '2019-02-11',
    text:
      '1. t consectetur adipisicing elit. A sequi perspiciatis quo fugi 2. Temporibus expedita tempore modi ex nemo. Ipsa prehenderit perferendis inventore eveniet, nihil? 3. Accusantium nulla corporis, commodi aliquam ullam laborum eius 4. Deleagni modi cum! Soluta, doloribus!'
  },
  {
    index: 10,
    name: '张三',
    date: '2019-02-10',
    text:
      '1. t consectetur adipisicing elit. A sequi perspiciatis quo fugi 2. Temporibus expedita tempore modi ex nemo. Ipsa prehenderit perferendis inventore eveniet, nihil? 3. Accusantium nulla corporis, commodi aliquam ullam laborum eius 4. Deleagni modi cum! Soluta, doloribus!'
  },
  {
    index: 11,
    name: '杨智峰',
    date: '2019-02-9',
    text:
      '1. t consectetur adipisicing elit. A sequi perspiciatis quo fugi 2. Temporibus expedita tempore modi ex nemo. Ipsa prehenderit perferendis inventore eveniet, nihil? 3. Accusantium nulla corporis, commodi aliquam ullam laborum eius 4. Deleagni modi cum! Soluta, doloribus!'
  },
  {
    index: 12,
    name: '张三',
    date: '2019-02-9',
    text:
      '1. t consectetur adipisicing elit. A sequi perspiciatis quo fugi 2. Temporibus expedita tempore modi ex nemo. Ipsa prehenderit perferendis inventore eveniet, nihil? 3. Accusantium nulla corporis, commodi aliquam ullam laborum eius 4. Deleagni modi cum! Soluta, doloribus!'
  },
  {
    index: 13,
    name: '张三',
    date: '2019-02-9',
    text:
      '1. t consectetur adipisicing elit. A sequi perspiciatis quo fugi 2. Temporibus expedita tempore modi ex nemo. Ipsa prehenderit perferendis inventore eveniet, nihil? 3. Accusantium nulla corporis, commodi aliquam ullam laborum eius 4. Deleagni modi cum! Soluta, doloribus!'
  },
  {
    index: 14,
    name: '张三',
    date: '2019-02-9',
    text:
      '1. t consectetur adipisicing elit. A sequi perspiciatis quo fugi 2. Temporibus expedita tempore modi ex nemo. Ipsa prehenderit perferendis inventore eveniet, nihil? 3. Accusantium nulla corporis, commodi aliquam ullam laborum eius 4. Deleagni modi cum! Soluta, doloribus!'
  },
  {
    index: 15,
    name: '张三',
    date: '2019-02-9',
    text:
      '1. t consectetur adipisicing elit. A sequi perspiciatis quo fugi 2. Temporibus expedita tempore modi ex nemo. Ipsa prehenderit perferendis inventore eveniet, nihil? 3. Accusantium nulla corporis, commodi aliquam ullam laborum eius 4. Deleagni modi cum! Soluta, doloribus!'
  },
  {
    index: 16,
    name: '张三',
    date: '2019-02-9',
    text:
      '1. t consectetur adipisicing elit. A sequi perspiciatis quo fugi 2. Temporibus expedita tempore modi ex nemo. Ipsa prehenderit perferendis inventore eveniet, nihil? 3. Accusantium nulla corporis, commodi aliquam ullam laborum eius 4. Deleagni modi cum! Soluta, doloribus!'
  },
  {
    index: 17,
    name: '张三',
    date: '2019-02-20',
    text:
      '1. t consectetur adipisicing elit. A sequi perspiciatis quo fugi 2. Temporibus expedita tempore modi ex nemo. Ipsa prehenderit perferendis inventore eveniet, nihil? 3. Accusantium nulla corporis, commodi aliquam ullam laborum eius 4. Deleagni modi cum! Soluta, doloribus!'
  },
  {
    index: 18,
    name: '张三',
    date: '2019-02-9',
    text:
      '1. t consectetur adipisicing elit. A sequi perspiciatis quo fugi 2. Temporibus expedita tempore modi ex nemo. Ipsa prehenderit perferendis inventore eveniet, nihil? 3. Accusantium nulla corporis, commodi aliquam ullam laborum eius 4. Deleagni modi cum! Soluta, doloribus!'
  }
];

class DiaryCardList extends React.Component {
  render() {
    const { diaryList, onDiaryModifying, onDiaryDelete } = this.props;
    const dateToday = new Date().toJSON().slice(0, 10);
    let d2 = Date.parse(dateToday);
    let diaryCardList = diaryList.map((diary, index) => {
      let d1 = Date.parse(diary.date);
      if (d1 >= d2 || index === 0) {
        return (
          <DiaryCard
            key={diary.index}
            editable="show"
            diary={diary}
            onDiaryModifying={() => onDiaryModifying(index)}
            onDiaryDelete={() => onDiaryDelete(index)}
          />
        );
      } else {
        return (
          <DiaryCard
            key={diary.index}
            editable="none"
            diary={diary}
            onDiaryModifying={() => onDiaryModifying(index)}
            onDiaryDelete={() => onDiaryDelete(index)}
          />
        );
      }
    });

    return <CardColumns style={{columnCount: '1'}}>{diaryCardList}</CardColumns>;
  }
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
      authorization: false,
      diaryList: diaryList.slice(),
      modifiedShow: false
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
  }

  componentDidMount() {
    let myStorage = window.localStorage;
    const userName = myStorage.getItem('userName');
    const passWord = myStorage.getItem('passWord');
    if(userName !== null && passWord !== null) {
      this.setState({
        userName: userName,
        passWord: passWord,
        authorization: true,
      });
    } else {
      this.setState({
        loginShow: true,
        authorization: false});
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

  handleClose() {
    this.setState({
      modalShow: false
    });
  }

  handleNewDiaryClick() {
    if(this.state.authorization &&
      this.state.userName !== '' &&
      this.state.passWord !== '') {
      if (this.state.diaryDate === '') {
        this.setState({
          modalShow: true,
          diaryDate: new Date().toJSON().slice(0, 10)
        });
      } else {
        this.setState({
          modalShow: true
        });
      }
    } else {
      this.setState({loginShow: true, authorization: false});
    }
  }
  
  handleUserClick() {
    this.setState({
      loginShow: true
    });
  }

  handleHomeClick() {
    if (this.state.authorization) {
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
  }

  handlePassWordChange(passWord) {
    this.setState({
      passWord: passWord
    });
  }

  handleLoginSubmit() {
    const userName = this.state.userName;
    const passWord = this.state.passWord;
    if(userName !== '' && passWord !== '') {
      localStorage.setItem('userName', userName);
      localStorage.setItem('passWord', passWord);
      this.setState({authorization: true});
    } else {
      this.setState({authorization: false});
    }
  }

  handleLogout() {
    localStorage.clear();
    this.setState({
      authorization: false,
      userName: '',
      passWord: ''
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
    if(this.state.authorization &&
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
      this.setState({loginShow: true, authorization: false});
    }
  }

  handleDiaryDelete(index) {
    if(this.state.authorization &&
      this.state.userName !== '' &&
      this.state.passWord !== '') {
        this.setState(prevState => {
          let list = prevState.diaryList;
          list.splice(index, 1);
          return { diaryList: list };
        });
    } else {
      this.setState({loginShow: true, authorization: false});
    }
  }

  handleDiarySubmit(index) {
    if (typeof index !== 'undefined') {
      this.setState(prevState => {
        let list = prevState.diaryList;
        list[index].text = prevState.diaryText;
        return {
          diaryList: list,
          diaryDate: '',
          diaryText: '',
          modifiedShow: false
        };
      });
    } else {
      this.setState(prevState => {
        let list = prevState.diaryList;
        let diary = {
          index: list.length,
          name: prevState.userName,
          date: prevState.diaryDate,
          text: prevState.diaryText
        };
        list.unshift(diary);
        return {
          diaryList: list,
          diaryDate: '',
          diaryText: '',
          modalShow: false
        };
      });
    }
  }

  render() {
    return (
      <Container>
        <Navbar sticky="top">
          <NewDiary />
        </Navbar>
        <NavigateBar>
          <SearchBar />
          <NewDiary onClick={this.handleNewDiaryClick} />
        </NavigateBar>      
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
        />
        <DiaryCardList
          diaryList={this.state.diaryList}
          onDiaryModifying={this.handleDirayModifying}
          onDiaryDelete={this.handleDiaryDelete}
        />

        <LoginWindow
          loginShow={this.state.loginShow}
          onHide={this.handleHomeClick}
          onLoginSubmit={this.handleLoginSubmit}
          onUserNameChange={this.handleUserNameChange}
          onPassWordChange={this.handlePassWordChange}
          userName={this.state.userName}
          passWord={this.state.passWord}
          authorization={this.state.authorization}
          onLogout={this.handleLogout}
        />
        <BottomBar sticky="bottom" style={{ margin: 'auto' }}>
          <HomePage />
        </BottomBar>
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
