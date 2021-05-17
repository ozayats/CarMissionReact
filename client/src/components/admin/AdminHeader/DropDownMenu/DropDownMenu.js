import React, { useEffect, useState } from "react";
import "./DropDownMenu.scss";
import { decodeUser } from "../../../../utils/functions/decodeUser";
import ChangeCredForm from "./ChangeCredForm/ChangeCredForm";
import axios from "axios";
import { toastr } from "react-redux-toastr";

const DropDownMenu = () => {
  const { firstName, lastName, id } = decodeUser().decoded;
  const [login, setLogin] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const user = await axios
        .get(`/api/admin-users/${id}`)
        .catch((err) => toastr.error(err.response.data.message));

      if (user.status === 200) {
        const { login } = user.data;
        setLogin(login);
      }
    };

    fetchUser();
  }, [id]);
  return (
    <div className="dropdown-wrap">
      <span className="dropdown-wrap__name">{`${firstName} ${lastName}`}</span>
      <span className="dropdown-wrap__login">{`@${login}`}</span>
      <ChangeCredForm id={id} isLogin setLogin={setLogin} />
      <ChangeCredForm id={id} isPass />
    </div>
  );
};

export default DropDownMenu;
