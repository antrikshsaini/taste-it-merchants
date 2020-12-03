import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignUpPic from "../../../assets/img/dishes/signUp.jpg";
import SignUpPicWebP from "../../../assets/img/dishes/signUp.jpg.webp";
import Logo from "../../../assets/img/logos/logo.png"
import LogoLarge from "../../../assets/img/logos/logo.svg"
import MediaQuery from 'react-responsive';

class SignUp extends Component {
  render() {
    return (
      <div className="signUp">
        <MediaQuery maxDeviceWidth={1200}>
          <Link to="/" >
            <img src={Logo} alt="logo" className="signIn__logo"/>
          </Link>
        </MediaQuery>

        <MediaQuery minDeviceWidth={1201}>
            <Link to="/" >
              <img src={LogoLarge} alt="logo" className="signIn__logoLarge"/>
            </Link>
        </MediaQuery>
        
        <div className="signUp__main">
          <picture>
            <source srcSet={SignUpPicWebP} type="image/webp" />
            <img src={SignUpPic} alt="logo" />
          </picture>
          
          <div className="signUp__container">
            <h1>Become a partner <br/>with Taste It.</h1>
            <p>
              Expand your reach, grow your patronage and give a delightful
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
