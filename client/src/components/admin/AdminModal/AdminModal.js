import React from "react";
import Button from "../../generalComponents/Button/Button";
import "./AdminModal.scss";

const AdminModal = ({
  isOpen,
  setIsOpen,
  head,
  deleteHandler: handler,
  isButtonsNeed,
  children,
}) => {
  const closeModal = (e) => {
    e.preventDefault();

    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-head">
            <h3 className="modal-head-text">{head}</h3>
            <Button
              text="&#215;"
              className="modal__close-btn"
              onClick={closeModal}
            />
          </div>
          <div className="modal__content">{children}</div>
          {isButtonsNeed && (
            <div className="modal__btn-wrapper">
              <Button
                text="Да"
                className="modal__btn yes-btn"
                onClick={handler}
              />
              <Button
                text="Нет"
                className="modal__btn no-btn"
                onClick={closeModal}
              />
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default AdminModal;
