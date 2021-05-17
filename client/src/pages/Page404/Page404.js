import React from "react";
import "./Page404.scss";
import Button from "../../components/generalComponents/Button/Button";

const Page404 = ({ history }) => {
  return (
    <div className="page-404">
      <h2 className="page-404__head">Ошибка 404</h2>
      <p className="page-404__text">Такой страницы не существует</p>
      <Button
        text="Назад"
        onClick={() => history.goBack()}
        className="button-callback"
      />
    </div>
  );
};

export default Page404;
