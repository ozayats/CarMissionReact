import React from "react";
import WorkStageItem from "../WorkStageItem/WorkStageItem";
import Loader from "../../../components/Loader/Loader";
import { useSelector } from "react-redux";
import {
  getWorkStages,
  getWorkStagesLoading,
} from "../../../store/workStages/selectors";
import useWinSize from "../../../utils/hooks/useWinSize";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WorkStagesList = () => {
  const stagesFromDB = useSelector(getWorkStages);
  const isLoading = useSelector(getWorkStagesLoading);
  const { width } = useWinSize();

  const sliderSettings = {
    className: "work-stages__slider",
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
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

  const listToRender = stagesFromDB.map((stage) => {
    const { num, name, _id: id, iconSrc } = stage;

    return (
      <WorkStageItem
        stageName={name}
        stageNum={num}
        stageLength={stagesFromDB.length}
        src={iconSrc}
        key={id}
      />
    );
  });

  return isLoading || !listToRender.length ? (
    <Loader className="work-stages__loader" />
  ) : width <= 640 ? (
    <Slider {...sliderSettings}>{listToRender}</Slider>
  ) : (
    <>{listToRender}</>
  );
};

export default WorkStagesList;
