import React, { useEffect, useState } from "react";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";
import CallbackItem from "../CallbackItem/CallbackItem";
import "./Callbacks.scss";

const Callbacks = () => {
  const [callbacksList, setCallbacksList] = useState([]);

  useEffect(() => {
    const getCallbacks = async () => {
      const callbacksFromDB = await axios
        .get("/api/feedbacks/")
        .catch((err) => toastr.error(err.response.data.message));

      if (callbacksFromDB.status === 200) {
        setCallbacksList(callbacksFromDB.data);
      } else {
        toastr.warning("Хм...", "Что-то пошло не так");
      }
    };

    getCallbacks();
  }, []);

  const mapCallbacks = () => {
    return callbacksList.map((callback) => {
      return (
        <CallbackItem
          sourceObj={callback}
          list={callbacksList}
          setList={setCallbacksList}
          key={callback._id}
        />
      );
    });
  };

  return (
    <div className="callbacks">
      <SectionHeading text="Заявки на обратный звонок" />
      <div className="callbacks__form-container">{mapCallbacks()}</div>
    </div>
  );
};

export default Callbacks;
