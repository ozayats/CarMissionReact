import React, { useState } from "react";
import AdminModal from "../../AdminModal/AdminModal";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import Button from "../../../generalComponents/Button/Button";
import "./CallbackItem.scss";

const dateOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

const CallbackItem = ({ sourceObj, list, setList }) => {
  const { name, phone, date, _id } = sourceObj;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteFromDB = async () => {
    const deleted = await axios
      .delete(`/api/feedbacks/delete/${_id}`)
      .catch((err) => {
        toastr.error(err.response.data.message);
      });

    if (deleted.status === 200) {
      toastr.success("Успешно", "Заявка удалена в базе данных");
      const filtered = list.filter((i) => i._id !== _id);
      setList(filtered);
    } else {
      toastr.warning("Хм...", "Что-то пошло не так");
    }
  };

  const openConfirmModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="callback__item">
      <p className="callback__data">{`Имя: ${name}`}</p>
      <p className="callback__data">{`Телефон: ${phone}`}</p>
      <p className="callback__data">Дата оставления заявки:</p>
      <p className="callback__data">
        {new Date(date).toLocaleString("ru", dateOptions)}
      </p>
      <Button
        className="callback__delete-btn"
        text="&#10005;"
        onClick={openConfirmModal}
      />
      <AdminModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        deleteHandler={handleDeleteFromDB}
        isButtonsNeed
        head="Подтверждение"
      >
        <p className="modal__content-text">
          Вы действительно хотите удалить эту заявку?
        </p>
      </AdminModal>
    </div>
  );
};

export default CallbackItem;
