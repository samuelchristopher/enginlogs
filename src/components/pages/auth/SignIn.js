import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
 
import { SignUpLink } from './SignUp'
import { withFirebase } from '../../Firebase'
import * as ROUTES from '../../../constants/routes'
import './auth.css'
 
const SignInPage = () => (
  <div className="mobile__bg">
    <div className="mobile__content spaced__content">
      <div className="logo__white"></div>
      <h1 className="tagline">Welcome Back!</h1>
      <SignInForm />
      <SignUpLink />
    </div>
  </div>
)
 
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}
 
class SignInFormBase extends Component {
  constructor(props) {
    super(props)
 
    this.state = { ...INITIAL_STATE }
  }
 
  onSubmit = event => {
    const { email, password } = this.state
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(ROUTES.DASHBOARD)
      })
      .catch(error => {
        this.setState({ error })
      })
 
    event.preventDefault()
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
 
  render() {
    const { email, password, error } = this.state
 
    const isInvalid = password === '' || email === ''
 
    return (
    <form className="signin__form" onSubmit={this.onSubmit}>
      <input
        name="email"
        value={email}
        onChange={this.onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={this.onChange}
        type="password"
        placeholder="Password"
      />
      <button className="signin__button button__unauth" disabled={isInvalid} type="submit">
        Sign In
      </button>

      {error && <p>{error.message}</p>}
    </form>
		)
  }
}
 
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase)
 
export default SignInPage
 
export { SignInForm }