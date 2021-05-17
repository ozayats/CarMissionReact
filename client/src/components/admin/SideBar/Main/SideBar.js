import React from "react";
import { useSelector } from "react-redux";
import SideBarItem from "../SideBarItem/SideBarItem";
import "./SideBar.scss";
import { getMainSections } from "../../../../store/appMainSections/selectors";
import { decodeUser } from "../../../../utils/functions/decodeUser";

const SideBar = () => {
  const navFromDB = useSelector(getMainSections)
    .filter((i) => i.disabled === false)
    .filter((i) => i.name !== "auto-offer")
    .map(({ name, heading }) => {
      return {
        route: name,
        heading,
      };
    });
  const { isOwner } = decodeUser().decoded;

  const links = [
    {
      route: "callback-requests",
      heading: "Обратный звонок",
    },
    {
      route: "main-page-sections",
      heading: "Секции главной страницы",
    },
    {
      route: "navbar",
      heading: "Пункты меню",
    },

    ...navFromDB,
    {
      route: "social-networks",
      heading: "Социальные сети",
    },
    {
      route: "Logo",
      heading: "Главное Лого",
    },
  ];
  isOwner &&
    links.unshift({
      route: "users",
      heading: "Администраторы",
    });
  const linksList = links.map(({ route, heading }, index) => {
    return <SideBarItem route={route} heading={heading} key={index} />;
  });

  return (
    <nav className="admin-sidebar">
      <ul className="admin-sidebar__list">{linksList}</ul>
    </nav>
  );
};

export default SideBar;
