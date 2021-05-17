import React, { useState, useEffect } from "react";
import SocialNetworksItem from "../SocialNetworksItem/SocialNetworksItem";
import PropTypes from "prop-types";
import "./SocialNetworks.scss";
import { useSelector } from "react-redux";
import { getSocialNetworks } from "../../store/socialNetworks/selectors";

const SocialNetworks = ({ className }) => {
  const data = useSelector(getSocialNetworks);
  const [items, setItems] = useState([]);

  useEffect(() => {
      setItems(data)
  }, [data])

  const linkItems = items.map((e) =>
    e.isEnabled ? (
      <SocialNetworksItem
        src={e.iconSrc}
        listClassName={`${className}-item`}
        className={className}
        url={e.url}
        id={`${e.name}-link`}
        key={e._id || e.id}
      />
    ) : null
  );
  return <ul className={className} data-testid="socialNetworks">{linkItems}</ul>;
};

SocialNetworks.propTypes = {
  className: PropTypes.string,
};

SocialNetworks.defaultTypes = {
  className: "",
};

export default SocialNetworks;
