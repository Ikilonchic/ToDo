import React, { useState } from 'react';

import { useHttp } from '../hooks/http.hook';

const SignUpForm: React.FC = () => {
  const { loading, error, request } = useHttp();
  const [ form, setForm ] = useState({
    email: '', pass: ''
  }) ;

  const validateForm = () => {
    const inputs = document.querySelectorAll('.validate-input');
      
    for(let i = 0; i < inputs.length; i++) {
      if(!inputs[i].classList.contains('true-validate')) {
        throw new Error();
      }
    }
  };

  const changeHandler = (event: any) => {
    setForm({...form, [event.target.name]: event.target.value });
  };
  
  const signUpHandler = async () => {
    try {
      validateForm();

      const data = await request('http://localhost:8080/auth/signup', 'POST', {...form});
    } catch (error) {
      
    }
  };

  return (
    <div className="container-login100">
      <div className="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
        <form className="login100-form validate-form" >
          <span className="login100-form-title p-b-37">
            Create Account
          </span>

          <div className="wrap-input100 validate-input m-b-25" data-validate="Enter email">
            <input className="input100" type="username" name="email" onInput={changeHandler} placeholder="email" autoComplete="new-password" disabled={loading} />
            <span className="focus-input100"></span>
          </div>

          <div className="wrap-input100 validate-input m-b-25" data-validate = "Enter password">
            <input className="input100" type="password" name="pass" onInput={changeHandler} placeholder="password" autoComplete="new-password" disabled={loading} />
            <span className="focus-input100"></span>
          </div>

          <div className="wrap-input100 validate-input m-b-25" data-validate = "Repeat password">
            <input className="input100" type="password" name="rep-pass" placeholder="repeat password" autoComplete="new-password" disabled={loading} />
            <span className="focus-input100"></span>
          </div>

          <div className="container-login100-form-btn">
            <button type="button" onClick={signUpHandler} className="login100-form-btn" disabled={loading}>
              Sign Up
            </button>
          </div>

          <div className="text-center p-t-57 p-b-20">
            <a href="/signin" className="txt2 hov1">
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  )
};

export default SignUpForm;