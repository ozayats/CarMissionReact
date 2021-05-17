import React, { useState, useEffect } from "react";
import UserItem from "../UserItem/UserItem";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";
import "./AdminsWrapper.scss";
import Button from "../../../generalComponents/Button/Button";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import InviteForm from "../InviteForm/InviteForm";
import AdminModal from "../../AdminModal/AdminModal";
import Switch from "react-switch";

const AdminsWrapper = () => {
  const [adminsList, setAdminsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminsHidden, setIsAdminsHidden] = useState(false);

  useEffect(() => {
    const getAdmins = async () => {
      const adminsFromDB = await axios
        .get("/api/admin-users/")
        .catch((err) => toastr.error(err.response.data.message));

      if (adminsFromDB.status === 200) {
        setAdminsList(adminsFromDB.data);
      } else {
        toastr.warning("Хм...", "Что-то пошло не так");
      }
    };

    const getHidden = async () => {
      const config = await axios
        .get("/api/configs/admins-visibility")
        .catch((err) => toastr.error(err.response.data.message));

      if (config.status === 200) {
        setIsAdminsHidden(config.data.hidden);
      }
    };

    getAdmins();
    getHidden();
  }, []);

  const toggleHidden = async () => {
    const updatedConfig = await axios
      .put("/api/configs/admins-visibility", { hidden: !isAdminsHidden })
      .catch((err) => toastr.error(err.response.data.message));

    if (updatedConfig.status === 200) {
      setIsAdminsHidden((prevState) => !prevState);
    }
  };

  const mapAdmins = () => {
    if (isAdminsHidden) {
      const filtered = adminsList.filter(
        (admin) => !admin.isOwner && !admin.hidden
      );
      return filtered.map((admin) => {
        return (
          <UserItem
            sourceObj={admin}
            key={admin._id}
            admins={adminsList}
            setAdmins={setAdminsList}
          />
        );
      });
    } else {
      return adminsList.map((admin) => {
        if (admin.isOwner) return null;
        return (
          <UserItem
            sourceObj={admin}
            key={admin._id}
            admins={adminsList}
            setAdmins={setAdminsList}
          />
        );
      });
    }
  };

  return (
    <div className="admin-users">
      <SectionHeading text="Администраторы" />
      <label className="admin-users__switch">
        <span className="admin-users__switch-name">
          Скрывать администраторов, помеченных как скрытые
        </span>
        <Switch onChange={toggleHidden} checked={isAdminsHidden} />
      </label>
      <div className="admin-users__form-container">{mapAdmins()}</div>
      <Button
        text="+"
        className="admin-users__add-btn"
        onClick={() => setIsModalOpen(true)}
      />
      <AdminModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        head="Приглашение пользователя"
      >
        <InviteForm />
      </AdminModal>
    </div>
  );
};

export default AdminsWrapper;
