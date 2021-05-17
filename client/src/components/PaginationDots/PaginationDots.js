import React from "react";
import PaginationDotItem from "../PaginationDotItem/PaginationDotItem";
import "./PaginationDots.scss";
import PropTypes from "prop-types";

const PaginationDots = ({ componentsList }) => {
  const dotsList = componentsList.map((section) => {
    return <PaginationDotItem key={section._id} anchor={section.name} />;
  });

  return <div className="pagination-dots">{dotsList}</div>;
};

PaginationDots.propTypes = {
  componentsList: PropTypes.arrayOf(PropTypes.object),
};

export default PaginationDots;
