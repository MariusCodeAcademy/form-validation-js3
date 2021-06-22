import React, { Component } from 'react';

class MainForm extends Component {
  state = {
    account: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      agreement: '',
    },
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Stoped form');
  };

  handleChange = (event) => {
    console.log(event);
    this.setState({ account: { ...this.state.account, [event.target.name]: event.target.value } });
  };

  handleCheck = (event) => {
    console.log(event);
    this.setState({ account: { ...this.state.account, agreement: event.target.checked } });
  };

  render() {
    const { account } = this.state;
    return (
      <div className="main-form">
        <h1>Main form</h1>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <input
            onChange={this.handleChange}
            value={account.username}
            className="input"
            type="text"
            name="username"
            placeholder="Username"
          />
          <input
            onChange={this.handleChange}
            value={account.email}
            className="input"
            type="text"
            name="email"
            placeholder="email"
          />
          <input
            onChange={this.handleChange}
            value={account.password}
            className="input"
            type="text"
            name="password"
            placeholder="password"
          />
          <input
            onChange={this.handleChange}
            value={account.repeatPassword}
            className="input"
            type="text"
            name="repeatPassword"
            placeholder="repeatPassword"
          />
          <div className="check-group">
            <input
              onChange={this.handleCheck}
              value={account.agreement}
              type="checkbox"
              name="agreement"
              id="agreement"
            />
            <label htmlFor="agreement">Agree?</label>
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default MainForm;
