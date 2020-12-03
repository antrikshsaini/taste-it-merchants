import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignUpAddressForm from "./SignUpAddressForm";
import Container from "@material-ui/core/Container";
import Logo from "../../../assets/img/logos/logo.svg";
import Croissant from "../../../assets/img/dishes/signUp2.png";
import CroissantWebP from "../../../assets/img/dishes/signUp2.png.webp";

class SignUpAddress extends Component {
  render() {
    return (
      <div className="signUp-address__wrapper">
        <div className="signUp-address">
          <Link to="/" >
            <img src={Logo} alt="logo" className="signUp-address__logo"/>
          </Link>
          
          <Container fixed className="signUp-address__main">
            <h1>You are just a few steps away.</h1>
            <p>
              Where is your restaurant located?
            </p>
            <SignUpAddressForm />
          </Container>
        </div>
        <picture>
            <source srcSet={CroissantWebP} type="image/webp" />
            <img src={Croissant} alt="Croissant" className="croissant" />
        </picture>
      </div>
      
    );
  }
}
export default SignUpAddress;
