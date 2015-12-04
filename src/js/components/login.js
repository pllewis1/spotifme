import React from 'react';
import {Link} from 'react-router';

class Login extends React.Component {
  constructor(props){
    super(props)

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    let user = {username: this.refs.username.value, password: this.refs.password.value};
    $.ajax({
      url: 'https://api.parse.com/1/users', headers: {}
    })
  }
  render() {
    return (
      <form>
        <input type="text" placeholder="username"/>
        <input type="password" placeholder="password"/>
        <input type="submit" value="login"/>
        <Link to="signup">Not a member? Sign Up</Link>
      </form>
    )
  }
}

export default Login;
