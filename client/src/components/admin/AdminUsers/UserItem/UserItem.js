import React from "react";
import Switch from "react-switch";
import "./UserItem.scss";
import axios from "axios";
import { toastr } from "react-redux-toastr";

const UserItem = ({ sourceObj, admins, setAdmins }) => {
  const { firstName, lastName, login, isAdmin, hidden, _id } = sourceObj;

  const toggleProp = async (propName, value) => {
    const res = await axios
      .put(`/api/admin-users/${_id}`, { [propName]: !value })
      .catch((err) => toastr.error(err.response.data.message));

    if (res.status === 200) {
      const updated = admins.map((admin) => {
        if (admin._id === _id) {
          return { ...res.data };
        } else {
          return admin;
        }
      });
      setAdmins(updated);
      toastr.success("Успешно", "Свойство изменено");
    }
  };

  const toggleAdminRight = async () => {
    await toggleProp("isAdmin", isAdmin);
  };

  const toggleAdminHidden = async () => {
    await toggleProp("hidden", hidden);
  };

  return (
    <div className="user-item">
      <p className="user-item__data">{`Имя: ${firstName}`}</p>
      <p className="user-item__data">{`Фамилия: ${lastName}`}</p>
      <p className="user-item__data">{`Логин: ${login}`}</p>
      <label className="user-item__switch">
        <span className="user-item__switch-name">Права администратора</span>
        <Switch checked={isAdmin} onChange={toggleAdminRight} />
      </label>
      <label className="user-item__switch">
        <span className="user-item__switch-name">Пометить как скрытого</span>
        <Switch checked={hidden} onChange={toggleAdminHidden} />
      </label>
    </div>
  );
};

export default UserItem;
