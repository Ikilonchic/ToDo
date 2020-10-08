import React from 'react';
import { 
  Redirect,
  Link
} from 'react-router-dom';
import cookie from 'react-cookies';
import swal from 'sweetalert';

import { signInRequest } from '../hooks/Request.hook';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false
    };

    this.signIn = this.signIn.bind(this);
  }

  render() {
    const is_logged_in = this.state.auth || cookie.load('userID') !== undefined;

    if(is_logged_in) {
      return this.redirectToMain();
    }
    
    return this.displaySignIn();
  }

  validateForm(email, pass) {
    if(email.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null &&
    pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/) == null) {
      throw 'Invalid email and password: minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.';
    } else if(email.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
      throw 'Invalid email';
    } else if(pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/) == null) {
      throw 'Invalid password: minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.';
    }
  };

  signIn() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;

    try {
      this.validateForm(email, pass);
  
      signInRequest(email, pass).then((response) => {
        this.setState({ auth: response.auth });
      }).catch(error => {
        swal({
          title: 'Error!',
          text: 'Connection error. Please, try again.',
          button: {
            text: 'Ok!',
            closeModal: true,
            className: 'container-form-btn p-t-20 form-btn'
          }
        });
      });
    } catch (error) {
      swal({
        title: 'Error!',
        text: error,
        button: {
          text: 'Ok!',
          closeModal: true,
          className: 'container-form-btn p-t-20 form-btn'
        }
      });
    }
  }

  redirectToMain() {
    return (<Redirect to='/' />);
  }

  displaySignIn() {
    return (
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
          <form className="login100-form validate-form">
            <span className="login100-form-title p-b-37">
              Sign In
            </span>
  
            <div className="wrap-input100 validate-input m-b-25" data-validate="Enter email">
              <input className="input100" type="username" name="email" id="email" placeholder="email" autoComplete="new-password" />
              <span className="focus-input100"></span>
            </div>
  
            <div className="wrap-input100 validate-input m-b-25" data-validate = "Enter password">
              <input className="input100" type="password" name="pass" id="pass" placeholder="password" autoComplete="new-password" />
              <span className="focus-input100"></span>
            </div>
  
            <div className="container-form-btn">
              <button type="button" onClick={this.signIn} className="form-btn">
                Sign In
              </button>
            </div>
  
            <div className="text-center p-t-57 p-b-20">
              <Link className="txt2 hov1" to="/signup">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
};
