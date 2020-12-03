import React, { Component } from "react";
import Logo from "../../assets/img/logos/logo.svg"

class Footer extends Component {
  render() {
    return (
      <footer className="site-footer">
        <div className="site-footer__upper">
          {/* Taste It Logo */}
          <img src={Logo} alt="Taste It Logo" className="site-footer__logo" />

          {/* About Us */}
          <div className="footer-content2">
            <h3>About Us</h3>
            <p>
              Taste It is an online food delivery platform that provides you with
              new food experiences through mystery dishes that are tailored to
              suit your preferences.
            </p>
          </div>

          {/* Design/Devlopment Assets */}
          <div className="footer-content3">
            <ul className="content3-list">

                <h3>Design Assets</h3>

              <li><a href="https://drive.google.com/file/d/1yceSuEx_1c0OaPuNDdOCbkWVwmgJzl96/view"　target="_blank">Marketing Materials</a></li>

              <li><a href="https://drive.google.com/file/d/1xyw8zCXyBQw8WLB6mlqE-3s5VQuf4VbM/view?usp=sharing" 　target="_blank">Promotional Videos</a></li>

              <li><a href="https://drive.google.com/file/d/1couz50H6GlM9GlTLKE4Zx032h2m0bowI/view"　target="_blank">Project Proposal</a></li>
            </ul>

            <ul className="content4-list">

                <h3>Development Assets</h3>

              <li><a href="https://drive.google.com/file/d/1yYfzrGLuL1vLHddLz_kNvPOrJnSYjPlY/view"　target="_blank">Tech Stacks</a></li>
              <li><a href="https://github.com/antrikshsaini/taste-it-merchants"　target="_blank">GitHub (Restaurant)</a></li>
              <li><a href="https://github.com/mert-oktem/taste-it-customer"　target="_blank">GitHub (Customer)</a></li>
            </ul>
          </div>
        </div>

        <hr />
      
        {/* Copy Right Section */}
        <div className="footer-content5">
          <div className="content5-text1">
            <p>Made with love remotely from Vancouver, BC.</p>
          </div>
          <div className="content5-text2">
            <p>© 2020 Taste It. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;
