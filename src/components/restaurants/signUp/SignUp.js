import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignUpPic from "../../../img/dishes/signUp.jpg";
import SignUpPicWebP from "../../../img/dishes/signUp.jpg.webp";
import Logo from "../../../img/logo.png"

class SignUp extends Component {
  render() {
    return (
      <div className="signUp">
        <Link to="/" >
          <img src={Logo} alt="logo" className="signIn__logo"/>
        </Link>
        
        <div className="signUp__main">
          <picture>
            <source srcset={SignUpPicWebP} type="image/webp" />
            <img src={SignUpPic} alt="logo" />
          </picture>
          
          <div className="signUp__container">
            <h1>Become a partner <br/>with Taste It.</h1>
            <p>
              Expand your reach, grow your network and give a delightful
              experience to your customers.
            </p>
            <SignUpForm />
          </div>
        </div>
      </div>
    );
  }
}
export default SignUp;
