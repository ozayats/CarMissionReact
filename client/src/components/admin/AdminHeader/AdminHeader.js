import React, { useState } from "react";
import Button from "../../generalComponents/Button/Button";
import "./AdminHeader.scss";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../../../store/auth/actions";
import axios from "axios";
import AccountIcon from "./SVG/AccountIcon";
import DropDownMenu from "./DropDownMenu/DropDownMenu";

const AdminHeader = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common.Authorization = null;
    dispatch(setIsAuth(false));
  };

  const toggleDropDown = () => {
    setIsDropDownOpen((prevState) => !prevState);
  };

  return (
    <div className="admin-header">
      <h3 className="admin-header__head">Admin Page</h3>
      <div className="admin-header__btn-wrapper">
        <Button
          text={<AccountIcon />}
          className="admin-header__account"
          onClick={toggleDropDown}
        />
        <Button
          className="button2-send-request"
          text="Logout"
          onClick={handleLogout}
        />
      </div>
      {isDropDownOpen && <DropDownMenu setState={setIsDropDownOpen} />}
    </div>
  );
};

export default AdminHeader;
