import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useWinSize from "../../utils/hooks/useWinSize";
import Navbar from "../Navbar/Navbar";
import Logo from "../Logo/Logo";
import Button from "../generalComponents/Button/Button";
import "./MainHeader.scss";
import { getLogoData } from "../../store/logo/selectors";
import { getNavbarData } from "../../store/navbar/selectors";

const MainHeader = () => {
  const logoInfo = useSelector(getLogoData);
  const navbarData = useSelector(getNavbarData);
  const { width: winWidth } = useWinSize();
  const [isMobileNavbar, setIsMobileNavbar] = useState(false);
  const firstMobileSize = 768;
  const isMobileWindowSize = winWidth <= firstMobileSize;
  const leftSideItems = navbarData.filter((e) => e.headerLocation === "left-side");
  const rightSideItems = navbarData.filter((e) => e.headerLocation === "right-side");

  const header = !isMobileWindowSize ? (
    <>
      <Navbar className="navbar" items={leftSideItems} />
      <div className="logo__block">
        <Link to="/">
          <Logo
            className="logo"
            src={logoInfo.iconSrc}
            id={logoInfo.id}
            alt={logoInfo.alt}
          />
        </Link>
      </div>
      <Navbar className="navbar" items={rightSideItems} />
    </>
  ) : (
    <>
      <div className="logo__block">
        <Link to="/">
          <Logo
            className="logo"
            src={logoInfo.iconSrc}
            id={logoInfo.id}
            alt={logoInfo.alt}
          />
        </Link>
      </div>
      {isMobileNavbar ? (
        <Navbar
          className="navbar"
          items={navbarData}
          id="navbar"
          mobileNavbar
          onClick={() => setIsMobileNavbar(!isMobileNavbar)}
        />
      ) : (
        <Button className="open-navbar" onClick={setIsMobileNavbar} text=""/>
      )}
    </>
  );

  return (
    <div className="header__bg">
      <div className="header__container">
        <div className="navbar__block" data-testid="navbar-block">{header}</div>
      </div>
    </div>
  );
};

export default MainHeader;
