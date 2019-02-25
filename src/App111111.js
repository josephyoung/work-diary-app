/* eslint-disable no-console */
import React from 'react';
// import axios from 'axios';
import getDiaryList from './getDiaryList'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: []
    }
    getDiaryList().then(res => {this.setState({result: res.data})});    
  }

  render() {
    const result = this.state.result;
    if(result.length !== 0) {
      return (
        <p>
          Hello React!
          <br />
          {this.state.result[0].text}
        </p>
      );
    } else {
      return <div>数据读取中...</div>;
    }
  }
}

export default App;
