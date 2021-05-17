import React from "react";
import "./SocialNetworksItem.scss";
import PropTypes from "prop-types";

const SocialNetworksItem = ({ className, url, id, listClassName, src }) => {
  return (
    <li className={listClassName}>
      <a
        className={`${className}-link`}
        href={url}
        id={id}
        target="_blank"
        rel="noreferrer"
        data-testid="socialNetworksLink"
      >
        <img data-testid="socialNetworksImg" className={`${className}-icon`} src={src} alt="social-network" />
      </a>
    </li>
  );
};

SocialNetworksItem.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
  id: PropTypes.string,
  listClassName: PropTypes.string,
  src: PropTypes.string,

};

SocialNetworksItem.defaultTypes = {
  className: "",
  url: "",
  id: "",
  listClassName: "",
  src: "",

};




export default SocialNetworksItem;
