import React from "react";
import { NavLink } from "react-router-dom";

const SideBarItem = ({ route, heading }) => {
  return (
    <li className="admin-sidebar__item">
      <NavLink
        to={`/admin/${route}`}
        activeClassName="admin-sidebar__link--active"
        className="admin-sidebar__link"
      >
        {heading}
      </NavLink>
    </li>
  );
};

export default SideBarItem;
