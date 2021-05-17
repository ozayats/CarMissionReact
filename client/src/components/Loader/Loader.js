import React from "react";
import "./Loader.scss";
import Image from "../Image/Image";
import PropTypes from "prop-types";

const Loader = ({ className }) => {
  return (
    <div className={className} data-testid="loader">
      <Image
        className="loader-motion"
        id="loader-img"
        alt="loader-img"
        src="/img/loader-img/loader-motion.png"
      />
      <Image
        className="loader-static"
        id="loader-img"
        alt="loader-img"
        src="/img/loader-img/loader-static.png"
      />
    </div>
  );
};

Loader.propTypes = {
  className: PropTypes.string,
};

Loader.defaultProps = {
  className: "loader-window",
};

export default Loader;
