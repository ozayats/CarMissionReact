import React from "react";
import MainHeader from "../../components/MainHeader/MainHeader";
import UserRoutes from "../../routes/UserRoutes";
import Footer from "../../components/Footer/Footer";
import { useLocation } from "react-router-dom";

const UserAppPage = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/" && <MainHeader />}
      <UserRoutes />
      <Footer />
    </>
  );
};

export default UserAppPage;
