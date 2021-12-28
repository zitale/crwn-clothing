import React from "react";

import './sign-in.style.scss';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {auth, signInWithGoogle} from "../../firebase/firebase.utils";

class SignIn extends React.Component{
  constructor() {
    super();
    this.state = {
      email: '',
      password:''
    }
  }

  handleSubmit = async event =>{
    event.preventDefault();
    const {email, password} = this.state;

    try{
      await auth.signInWithEmailAndPassword(email,password)
      this.setState({email:'',password:''})
    } catch (error){
      console.log(error);
    }
  };

  handleChange = event =>{
    const {value,name} = event.target;
    this.setState({[name]:value})
  }

  render() {
    return(
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type="email"
            label={'Email'}
            onChange={this.handleChange}
            value={this.state.email}
            required
          />
          <FormInput
            type="password"
            name='password'
            value={this.state.password}
            label={'Password'}
            onChange={this.handleChange}
            required
          />

          <div className='buttons'>
            <CustomButton type='submit'> SignIn</CustomButton>
            <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn> SignIn with Google</CustomButton>
          </div>

        </form>
      </div>
    );
  }
}

export default SignIn;