/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  Navbar,
  InputGroup,
  Card,
  Modal,
  Row,
  Col
} from 'react-bootstrap';
import './bootstrap.min.css';
import 'holderjs';

class NewDiary extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <Button className="ml-2" variant="success" onClick={onClick}>
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
      <Modal.Header closeButton>
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
      <Form inline>
        <FormControl
          type="text"
          placeholder="搜索日志"
          className="mr-sm-2"
          style={{ maxWidth: '50%' }}
        />
        <InputGroup.Append>
          <Button className="m-0" variant="outline-light">
            搜索
          </Button>
        </InputGroup.Append>
        {this.props.children}
      </Form>
    );
  }
}

class NavigateBar extends React.Component {
  render() {
    const { sticky } = this.props;
    return (
      <Navbar
        sticky={sticky}
        expand="lg"
        className="bg-primary justify-content-around"
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
  render() {
    const { 
      onHide, 
      onLoginSubmit,
      userLoginFormDisplay,
      userName,
      passWord,
      onUserNameChange,
      onPassWordChange
    } = this.props;

    return (
      <div style={{display: userLoginFormDisplay}}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-titl-vcenter">登录信息</Modal.Title>
        </Modal.Header>
        <Form style={{ width: '80%', margin: 'auto' }}>
          <Form.Group as={Row} controlId="form-control-plaintext">
            <Form.Label column sm={3}>
              用户名
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text" 
                placeholder="请输入用户名" 
                required 
                value={userName}
                onChange={(e) => onUserNameChange(e.target.value)}
              />
            </Col>
            <Form.Control.Feedback type='invalid'>请输入用户名</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Row} controlId="form-control-plaintext">
            <Form.Label column sm={3}>
              密码
            </Form.Label>
            <Col sm={8}>
              <Form.Control 
                type="password" 
                placeholder="请输入密码" 
                required 
                value={passWord}
                onChange={(e) => onPassWordChange(e.target.value)}
              />
              <Form.Control.Feedback type='invalid'>请输入密码</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group controlId='formBasicLink' className='text-center'>
            <Button variant="link" size='sm'>注册</Button> 
            <Button variant="link" size='sm'>忘记密码</Button>           
          </Form.Group>
        </Form>            
        <Modal.Footer>
          <Button variant="danger" onClick={onHide}>
            取消
          </Button>
          <Button variant="success" type="submit" onClick={onLoginSubmit}>
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
      authentication,
      onLogout
    } = this.props;

    let userLoginFormDisplay, userInfoFormDisplay;
    
    if(!authentication) {
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
    return(
      <div style={{display: userInfoFormDisplay}}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-titl-vcenter">登录信息</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {userName}
            , 您已登录成功。
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={onLogout}>登出</Button>
          <Button variant='success' onClick={onHide}>关闭</Button>
        </Modal.Footer>
      </div>
    )
  }
}

class DiaryCard extends React.Component {
  render() {
    const { editable, diary, onDiaryModifying, onDiaryDelete} = this.props;
    const { name, date, text } = diary;
    return (
      <Card>
        <Card.Header as="h5">
          {date}
(
          {name}
)
        </Card.Header>
        <Card.Body>{text}</Card.Body>
        <Card.Footer style={{ display: editable, textAlign: 'right'}} className='text-sm-right'>
          <Button variant="danger" size='sm' className='mr-2' onClick={onDiaryDelete}>删除</Button>
          <Button variant="success" size='sm' className='rounded' onClick={onDiaryModifying}>修改</Button>
        </Card.Footer>
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
        title="Me"
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
      '1. Lorem ipsum doloam, doloremque. 2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga laboriosres ad. 3. Lorem ipsum dolor sit alor beatae quisquam alia.'
  },
  {
    index: 4,
    name: '张三',
    date: '2019-02-21',
    text:
      '1. t consectetur adipisicing elit. A sequi perspiciatis quo fugi 2. Temporibus expedita tempore modi ex nemo. Ipsa prehenderit perferendis inventore eveniet, nihil? 3. Accusantium nulla corporis, commodi aliquam ullam laborum eius 4. Deleagni modi cum! Soluta, doloribus!'
  },
  {
    index: 5,
    name: '张三',
    date: '2019-02-22',
    text:
      '1. t consectetur adipisicing elit. A sequi perspiciatis quo fugi 2. Temporibus expedita tempore modi ex nemo. Ipsa prehenderit perferendis inventore eveniet, nihil? 3. Accusantium nulla corporis, commodi aliquam ullam laborum eius 4. Deleagni modi cum! Soluta, doloribus!'
  },
  {
    index: 6,
    name: '张三',
    date: '2019-02-14',
    text:
      '1. t consectetur adipisicing elit. A sequi perspiciatis quo fugi 2. Temporibus expedita tempore modi ex nemo. Ipsa prehenderit perferendis inventore eveniet, nihil? 3. Accusantium nulla corporis, commodi aliquam ullam laborum eius 4. Deleagni modi cum! Soluta, doloribus!'
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
    name: '张三',
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
  render () {
    const { diaryList, onDiaryModifying, onDiaryDelete } = this.props;
    const dateToday = new Date().toJSON().slice(0, 10);
    let d2 = Date.parse(dateToday);
    let diaryCardList = diaryList.map((diary, index) => {
      let d1 = Date.parse(diary.date);
      if(d1 >= d2 || index === 0) {
        return <DiaryCard key={diary.index} editable='show' diary={diary} onDiaryModifying={() => onDiaryModifying(index)} onDiaryDelete={() => onDiaryDelete(index)} />
      } else {
        return <DiaryCard key={diary.index} editable='none' diary={diary} onDiaryModifying={() => onDiaryModifying(index)} onDiaryDelete={() => onDiaryDelete(index)} />
      }
    });

    return (
      <>
        {diaryCardList}
      </>
    );
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
      authentication: false,
      diaryList: diaryList.slice(),
      modifiedShow: false,
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
    this.isScrollAtBottom = this.isScrollAtBottom.bind(this);
    this.handleDirayModifying = this.handleDirayModifying.bind(this);
    this.handleDiaryDelete = this.handleDiaryDelete.bind(this);
    this.handleDiarySubmit = this.handleDiarySubmit.bind(this);
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
    if(this.state.diaryDate === '') {
      this.setState({
        modalShow: true,
        diaryDate: new Date().toJSON().slice(0, 10)
      });
    } else {
      this.setState({
        modalShow: true
      });
    }
  }

  handleUserClick() {
    this.setState({
      loginShow: true
    });
  }

  handleHomeClick() {
    if(this.state.authentication) {
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
    this.setState({
      authentication: true
    })
  }

  isScrollAtBottom() {
    let scrollTop = document.documentElement.scollTop;
    let windowHeight = document.body.clientHeight;
    let scrollHeight = document.documentElement.scrollHeight;
    if(scrollTop === windowHeight + scrollHeight) {
      return true;
    } else {
      return false;
    }
  }

  handleDirayModifying(index) {
    this.modifiedIndex = index;
    this.setState(prevState => {
      let date = prevState.diaryList[index].date;
      let text = prevState.diaryList[index].text;
      return ({
        modifiedShow: true,
        diaryDate: date,
        diaryText: text,
      });
    });
  }

  handleDiaryDelete(index) {
    this.setState(prevState => {
      let list = prevState.diaryList;
      list.splice(index, 1);
      return ({diaryList: list});
    });
  }

  handleDiarySubmit(index) {
    if(typeof(index) !== 'undefined') {
      this.setState(prevState => {
        let list = prevState.diaryList;
        list[index].text = prevState.diaryText;
        return ({
          diaryList: list,
          diaryDate: '',
          diaryText: '',
          modifiedShow: false,
        });
      })
    } else {
      this.setState(prevState => {
        let list = prevState.diaryList;
        let diary = {
          index: list.length,
          name: prevState.userName,
          date: prevState.diaryDate,
          text: prevState.diaryText,
        }
        list.unshift(diary);
        return ({
          diaryList: list,
          diaryDate: '',
          diaryText: '',
          modalShow: false,
        });
      });
    }
  }

  render() {
    return (
      <div style={{ margin: 'auto', maxWidth: '40rem' }}>
        <NavigateBar sticky="top">
          <SearchBar>
            <NewDiary onClick={this.handleNewDiaryClick} />
          </SearchBar>
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
          onHide={() => this.setState({
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
        <DiaryCardList diaryList={this.state.diaryList} onDiaryModifying={this.handleDirayModifying} onDiaryDelete={this.handleDiaryDelete} />

        <LoginWindow
          loginShow={this.state.loginShow}
          onHide={this.handleHomeClick}
          onLoginSubmit={this.handleLoginSubmit}
          onUserNameChange={this.handleUserNameChange}
          onPassWordChange={this.handlePassWordChange}
          userName={this.state.userName}
          passWord={this.state.passWord}
          authentication={this.state.authentication}
          onLogout={() => {this.setState({
                            authentication: false,
                            userName: '',
                            passWord: ''
                          });
                          }
                  }
        />
        <BottomBar sticky="bottom" style={{ margin:'auto', maxWidth: '40em' }}>
          <HomePage />
        </BottomBar>
        <BottomBar fixed="bottom" style={{ margin: 'auto', maxWidth: '40rem' }}>
          <HomePage
            loginShow={this.state.loginShow}
            onClick={this.handleHomeClick}
          />
          <Person
            loginShow={this.state.loginShow}
            onClick={this.handleUserClick}
          />
        </BottomBar>
      </div>
    );
  }
}

function App() {
  return <DiaryPlatform />;
}

export default App;
