import React, { useState } from "react";
import Button from "../generalComponents/Button/Button";
import AdminModal from "../admin/AdminModal/AdminModal";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import AdminDropZone from "../admin/AdminDropZone/AdminDropZone";
import { checkIsInputNotChanges } from "../../utils/functions/checkIsInputNotChanges";

const enhanceFormItem = (Component, config) => {
  return (props) => {
    const { routes, actions, dropZone, canBeDeleted, pathProp } = config;
    const { sourceObj, isNew } = props;
    const [isDeleted, setIsDeleted] = useState(false);
    const [fileReady, setFileReady] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const handleDeleteFromDB = async (e) => {
      e.preventDefault();

      const deleted = await axios
        .delete(`${routes.delete}${sourceObj._id}`)
        .catch((err) => {
          toastr.error(err.response.data.message);
        });

      if (deleted.status === 200) {
        toastr.success("Успешно", "Объект удалён в базе данных");
        dispatch(actions.filterDeleted(sourceObj._id));
      } else {
        toastr.warning("Хм...", "Что-то пошло не так");
      }
    };

    const handleDeleteNew = (e) => {
      e.preventDefault();
      setIsDeleted(true);
      toastr.success("Успешно", "Объект удалён до внесения в базу данных");
    };

    const uploadImgAndUpdateStore = async (values, id) => {
      const res = await axios
        .post(`${routes.upload}${id}`, fileReady, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch((err) => {
          toastr.error(err.response.data.message);
        });

      dispatch(actions.updateS3Link(res.data.location, id));
      setFileReady(null);
      values[pathProp] = res.data.location;
      toastr.success("Успешно", "Изображение загружено");
    };

    const updateDBCollection = async (values) => {
      const updatedObj = {
        ...sourceObj,
        ...values,
      };
      const updated = await axios
        .put(`${routes.put}${sourceObj._id}`, updatedObj)
        .catch((err) => {
          toastr.error(err.response.data.message);
        });

      if (updated.status === 200) {
        dispatch(actions.updateInRedux(updated.data));
        toastr.success("Успешно", "Объект изменён в базе данных");
      } else {
        toastr.warning("Хм...", "Что-то пошло не так");
      }
    };

    const handleUpdate = async (values) => {
      if (fileReady && checkIsInputNotChanges(values, sourceObj)) {
        await uploadImgAndUpdateStore(values, sourceObj._id);
      } else if (!fileReady && !checkIsInputNotChanges(values, sourceObj)) {
        await updateDBCollection(values);
      } else if (fileReady && !checkIsInputNotChanges(values, sourceObj)) {
        uploadImgAndUpdateStore(values, sourceObj._id).then(() =>
          updateDBCollection(values)
        );
      } else {
        toastr.warning("Сообщение", "Ничего не изменилось");
      }
    };

    const handlePostToDB = async (values) => {
      if (values[pathProp] || fileReady) {
        const newObj = await axios.post(routes.post, values).catch((err) => {
          toastr.error(err.response.data.message);
        });

        if (newObj.status === 200) {
          if (fileReady) {
            await uploadImgAndUpdateStore(values, newObj.data._id);
          }

          dispatch(
            actions.addNew({ ...newObj.data, [pathProp]: values[pathProp] })
          );
          toastr.success("Успешно", "Объект добавлен в базу данных");
        } else {
          toastr.warning("Хм...", "Что-то пошло не так");
        }
      } else {
        toastr.warning("Warning", "Не добавлено изображение или путь к нему");
      }
    };

    const handlePostWithoutDropzone = async (values) => {
      const newObj = await axios.post(routes.post, values).catch((err) => {
        toastr.error(err.response.data.message);
      });

      if (newObj.status === 200) {
        dispatch(actions.addNew({ ...newObj.data }));
        toastr.success("Успешно", "Объект добавлен в базу данных");
      } else {
        toastr.warning("Хм...", "Что-то пошло не так");
      }
    };

    const openConfirmModal = (e) => {
      e.preventDefault();
      setIsModalOpen(true);
    };

    if (isDeleted) {
      return null;
    }

    return (
      <Component
        handleUpdate={handleUpdate}
        handlePost={dropZone ? handlePostToDB : handlePostWithoutDropzone}
        {...props}
      >
        {dropZone && (
          <AdminDropZone
            imgURL={sourceObj[pathProp]}
            setFile={setFileReady}
            file={fileReady}
          />
        )}
        {canBeDeleted && (
          <>
            <Button
              className="admin-stages__delete-btn"
              text="&#10005;"
              onClick={openConfirmModal}
            />
            <AdminModal
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              deleteHandler={isNew ? handleDeleteNew : handleDeleteFromDB}
              isButtonsNeed
              head="Подтверждение"
            >
              <p className="modal__content-text">
                Вы действительно хотите удалить этот объект?
              </p>
            </AdminModal>
          </>
        )}
      </Component>
    );
  };
};

export default enhanceFormItem;
