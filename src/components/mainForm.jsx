import React, { Component } from 'react';
import Joi from 'joi-browser';

class MainForm extends Component {
  state = {
    account: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      agreement: '',
    },
    errors: {},
  };

  // validacijo schema
  schema = {
    username: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(4).required(),
    repeatPassword: Joi.ref('password'),
    agreement: Joi.boolean().required(),
  };

  validateForm() {
    const result = Joi.validate(this.state.account, this.schema, { abortEarly: false });
    console.log('Joi result', result);

    if (!result.error) return;

    const errors = {};
    // errors.username = result.error.details;
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    console.log('local errors', errors);
    this.setState({ errors: errors });

    // if (this.state.account.username.length === 0) {
    //   this.setState({ errors: { username: 'Cant be blank' } });
    //   return;
    // }
    // if (this.state.account.username.length <= 3) {
    //   this.setState({ errors: { username: 'At least 3 letters' } });
    // }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Stoped form');
    this.setState({ errors: {} });
    this.validateForm();
  };

  handleChange = (event) => {
    // console.log(event);
    this.setState({ account: { ...this.state.account, [event.target.name]: event.target.value } });
  };

  handleCheck = (event) => {
    // console.log(event);
    this.setState({ account: { ...this.state.account, agreement: event.target.checked } });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div className="main-form">
        <h1>Main form</h1>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <input
            onChange={this.handleChange}
            value={account.username}
            className={'input ' + (errors.username && 'is-invalid')}
            type="text"
            name="username"
            placeholder="Username"
          />
          {errors.username && <p className="error-msg">{errors.username}</p>}

          <input
            onChange={this.handleChange}
            value={account.email}
            className={'input ' + (errors.email && 'is-invalid')}
            type="text"
            name="email"
            placeholder="email"
          />
          {errors.email && <p className="error-msg">{errors.email}</p>}

          <input
            onChange={this.handleChange}
            value={account.password}
            className={'input ' + (errors.password && 'is-invalid')}
            type="text"
            name="password"
            placeholder="password"
          />
          {errors.password && <p className="error-msg">{errors.password}</p>}
          <input
            onChange={this.handleChange}
            value={account.repeatPassword}
            className={'input ' + (errors.repeatPassword && 'is-invalid')}
            type="text"
            name="repeatPassword"
            placeholder="repeatPassword"
          />
          {errors.repeatPassword && <p className="error-msg">{errors.repeatPassword}</p>}
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
          {errors.agreement && <p className="error-msg">{errors.agreement}</p>}
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default MainForm;
