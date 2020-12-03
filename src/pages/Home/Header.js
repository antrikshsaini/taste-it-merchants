import React from "react";
import MediaQuery from 'react-responsive';
import MobileMenu from "./navigation/MobileMenu";
import DesktopMenu from "./navigation/DesktopMenu";

const Header = () => {
  return (
    <header className="site-header">
      {/* If the screen width is less than 1200 */}
      <MediaQuery maxDeviceWidth={950}>
        <MobileMenu />
      </MediaQuery>

      {/* If the screen width is more than 1200 */}
      <MediaQuery minDeviceWidth={951}>
        <DesktopMenu />
      </MediaQuery>
    </header>
  );
}

export default Header;
