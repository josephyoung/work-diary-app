/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import './App.css';

function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">{props.title}</h1>
      <p className="Dialog-message">{props.message}</p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.state = {login: ''};
  }

  handleChange(e) {
    this.setState({
      login: e.target.value
    });
  }

  handleSignup() {
    alert(`Welcome aboard, ${this.state.login}`);
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program" message="How should we refer to you?">
        <input value={this.state.login} onChange={this.handleChange} />
        <button onClick={this.handleSignup}>Sign Me up!</button>
      </Dialog>
    );
  }
}

class App extends Component {
  render() {
    return (
      <SignUpDialog />
    );
  }
}

export default App;
