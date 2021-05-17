import React, { useState, useEffect, useMemo } from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import "./RegistrationPage.scss";
import useQuery from "../../utils/hooks/useQuery";
import axios from "axios";
import SectionHeading from "../../components/generalComponents/SectionHeading/SectionHeading";
import Button from "../../components/generalComponents/Button/Button";
import { useHistory } from "react-router-dom";

const RegistrationPage = () => {
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();
  const query = useQuery();
  const uuid = useMemo(() => query.get("uuid"), [query]);
  const email = useMemo(() => query.get("email"), [query]);

  useEffect(() => {
    axios
      .post("/api/invites/validate", { uuid, email })
      .then((r) => {
        if (r.status === 200) {
          setIsValid(true);
        }
      })
      .catch(() => {
        setIsValid(false);
      });
  }, [uuid, email]);

  const goToMain = () => {
    history.push("/");
  };

  return (
    <div className="registration">
      <SectionHeading text="Регистрация" />
      {isValid ? (
        <RegistrationForm uuid={uuid} email={email} />
      ) : (
        <div className="registration__denied">
          <p className="registration__denied-text">Access denied</p>
          <Button
            text="На главную"
            onClick={goToMain}
            className="button-callback"
          />
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;
