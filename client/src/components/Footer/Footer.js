import React from "react";
import "./Footer.scss";
import Navbar from "../Navbar/Navbar";
import Logo from "../Logo/Logo";
import SocialNetworks from "../SocialNetworks/SocialNetworks";
import { useSelector } from "react-redux";
import { getLogoData } from "../../store/logo/selectors";
import { getNavbarData } from "../../store/navbar/selectors";
import { Link } from "react-router-dom";
import useWinSize from "../../utils/hooks/useWinSize";

const Footer = () => {
  const logoInfo = useSelector(getLogoData);
  const navbarItems = useSelector(getNavbarData);
  const { width: winWidth } = useWinSize();
  const leftSideItems = navbarItems.filter((e) => e.footerLocation === "left-side");
  const rightSideItems = navbarItems.filter((e) => e.footerLocation === "right-side");
  const firstMobileSize = 640;
  const isMobileDevice = winWidth <= firstMobileSize;
  const footerContent = isMobileDevice
      ?
        <>
          <Navbar className="footer" items={navbarItems} isFooter={true}/>
          <div className="footer__info-block">
            <div className="footer__line"></div>
            <SocialNetworks className="footer__networks" />
          </div>
          <div className="footer__logo-bg">
            <Logo
              className="logo footer__logo"
              src={logoInfo.iconSrc}
              id={logoInfo.id}
              alt={logoInfo.alt}
            />
          </div>
        </>
      :
      <>
        <Navbar className="footer--left-side footer" items={leftSideItems} />
        <div className="footer__info-block">
          <Link to="/" className="footer__logo-link">
            <Logo
              className="logo"
              src={logoInfo.iconSrc}
              id={logoInfo.id}
              alt={logoInfo.alt}
            />
          </Link>
          <div className="footer__line"></div>
          <SocialNetworks className="footer__networks" />
        </div>
        <Navbar
          className="footer--right-side footer"
          items={rightSideItems}
          isFooter={true}
        />
      </>;

  return (
    <div className="footer__bg">
      <div className="footer__container">
        <div className="footer__block" id="footer" data-testid="footerNavbarBlock">
          {footerContent}
        </div>
      </div>
    </div>
  );
};

export default Footer;
