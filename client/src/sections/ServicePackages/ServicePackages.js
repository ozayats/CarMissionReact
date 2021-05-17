import React, { memo } from "react";
import SectionHeading from "../../components/generalComponents/SectionHeading/SectionHeading";
import "./servicePackages.scss";
import Button from "../../components/generalComponents/Button/Button";
import ServicePackage from "./components/ServicePackage";
import { showFeedbackFormAction } from "../../store/FeedbackForm/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  getPackages,
  getPackagesIsLoading,
} from "../../store/servicePackages/selectors";
import useLiveHashPush from "../../utils/hooks/useLiveHashPush";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "../../components/Loader/Loader";
import PropTypes from "prop-types";

const ServicePackages = ({ heading, anchorName, description }) => {
  const dispatch = useDispatch();
  const ref = useLiveHashPush(anchorName);
  const services = useSelector(getPackages);
  const isLoading = useSelector(getPackagesIsLoading);

  const showFeedbackModal = () => {
    dispatch(showFeedbackFormAction);
  };

  const servicePackagesToRender = services.map((servicePackage) => {
    const { price, currency, serviceList, name, _id: id } = servicePackage;
    return (
      <ServicePackage
        className="service-packages__item"
        name={name}
        price={price}
        currency={currency}
        serviceList={serviceList}
        key={id}
      />
    );
  });

  const settings = {
    className: "center",
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 898,
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 361,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="service-packages" id={anchorName} ref={ref}>
      <SectionHeading text={heading} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="service-packages__wrapper">
          <Slider {...settings}>{servicePackagesToRender}</Slider>
          <p className="service-packages__description">{description}</p>
          <Button
            className="button2-send-request"
            text="Отправить заявку"
            onClick={showFeedbackModal}
          />
        </div>
      )}
    </section>
  );
};

ServicePackages.propTypes = {
  description: PropTypes.string,
  heading: PropTypes.string,
  anchorName: PropTypes.string,
};

export default memo(ServicePackages);
