import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./footer.css";
import React from "react";

const Footer = () => {
  return (
    <React.Fragment>
      <footer id="footer">
        <div className="leftFooter">
          <h4>DOWNLOAD OUR APP</h4>
          <p>Download App for Android and IOS mobile phone</p>
          <img src={playStore} alt="playstore" />
          <img src={appStore} alt="Appstore" />
        </div>

        <div className="midFooter">
          <h2>ECOMMERCE.</h2>
          <p>High Quality is our first priority</p>
        </div>

        <div className="rightFooter">
          <h4>Follow Us</h4>
          <a href="http://instagram.com/an.iket1026__">Instagram</a>
          <a href="http://instagram.com/an.iket1026__">Facebook</a>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
