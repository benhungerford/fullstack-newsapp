import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: '',
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleLogout(event){
    console.log('works');
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    const handleError = (err) => console.warn(err);
    const responce = await fetch('/api/v1/rest-auth/logout/', options);
    const data = await responce.json().catch(handleError);
    if(data.detail === "Successfully logged out."){
      Cookies.remove('Authorization');
    }
  }

  render() {
    return(
      <form onSubmit={(event) => this.props.handleRegistration(event, this.state)}>
        <h4>Register</h4>
        <div className="form-group">
          <label htmlFor="InputName1">Username</label>
          <input type="username" className="form-control" id="InputName1" name="username" value={this.state.username} onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <label htmlFor="InputEmail1">Email address</label>
          <input type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" name="email" value={this.state.email} onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword1">Create password</label>
          <input type="password" className="form-control" id="InputPassword1" name="password1" value={this.state.password1} onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword2">Re-type password</label>
          <input type="password" className="form-control" id="InputPassword2" name="password2" value={this.state.password2} onChange={this.handleInput} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button className="btn btn-primary" onClick={this.props.loginPage}>Login</button>
        <button className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
      </form>
    )
  }
}

export default Register;
