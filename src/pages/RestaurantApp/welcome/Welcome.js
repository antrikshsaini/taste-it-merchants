import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import { getJwtToken } from "../../../components/getJwt";
import Logo from "../../../assets/img/logos/logo.svg";
import HeroPicMobile from "../../../assets/img/dishes/welcomeMobileView.png"
import HeroPicMobileWebP from "../../../assets/img/dishes/welcomeMobileView.png.webp"
import HeroPicDesktop from "../../../assets/img/dishes/welcome.png"
import HeroPicDesktopWebP from "../../../assets/img/dishes/welcome.png.webp"
import MediaQuery from 'react-responsive';
import {BASE_URL} from "../../../config/config"


class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      items:[]
    };
  }

  componentDidMount() {
    const jwt = getJwtToken();
    if (!jwt) {
      this.props.history.push("/signIn");
    }

    axios
      .get(`${BASE_URL}/restaurants/`, {
        headers: { Authorization: `${jwt}` },
      })
      .then((res) => {
        this.setState({
          user: res.data,
          items: res.data[0]
        });
      })
      .catch((err) => {
        localStorage.removeItem("jwt-token");
        this.props.history.push("/signIn");
      });
  }


  render() {
    const items = this.state.items;
    if (this.state.user === undefined) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }

    return (
      <div className="welcome_wrapper">
        <MediaQuery minDeviceWidth={1001}>
          <picture>
            <source srcSet={HeroPicDesktopWebP} type="image/webp" />
            <img src={HeroPicDesktop} alt="A glasss of champagne" className="welcome__hero, welcome__heroPicDesktop" />
          </picture>
        </MediaQuery>

        <div className="welcome">
          <Link to="/" >
            <img src={Logo} alt="logo" className="welcome__logo"/>
          </Link>

          <Container fixed className="welcome__main">
            <MediaQuery maxDeviceWidth={1000}>
              <picture>
                <source srcset={HeroPicMobileWebP} type="image/webp" />
                <img src={HeroPicMobile} alt="A glasss of champagne" className="welcome__heroPicMobile"/>
              </picture>
            </MediaQuery>

            
            
            <h2>Hi {items.restaurantName} !</h2>
            <h1>Welcome Aboard!</h1>
            <p>Ready to do e-commerce your way?</p>
            <p>
              Tackle the complexity of growing your business and selling
              online—with a platform designed to make it simple at any stage.
            </p>
            <Link to="/restaurant" ><button>Get Started</button></Link>
          </Container>
          </div>
      </div>
    );
  }
}
export default Welcome;
