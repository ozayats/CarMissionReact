import React from "react";
import ReactHtmlParser from "react-html-parser";
import SectionHeading from "../../../components/generalComponents/SectionHeading/SectionHeading";
import Image from "../../../components/Image/Image";
import PropTypes from "prop-types";

const BlogPageItem = ({ className, data }) => {
  const { fullText, date, photo, title } = data;
  const correctDate = new Date(+date);
  const correctNums = (day) => {
    let num = day ? correctDate.getDate() : correctDate.getMonth() + 1;
    if (num < 10) {
      num = "0" + num;
    }
    return num;
  };
  const dateDDMMYYY =
    correctNums(true) + "." + correctNums() + "." + correctDate.getFullYear();

  return (
    <>
      <Image src={photo} className={`${className}__img`} alt="blog-img" />
      <div className={`${className}__side-line`}>
        <div className={`${className}__text-content`}>
          <SectionHeading text={title} className={`${className}__header`} />
          <p className={`${className}__date`}>{dateDDMMYYY}</p>
          <div className={`${className}__text-paragraph`}>
            {ReactHtmlParser(fullText)}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPageItem;

BlogPageItem.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
};

BlogPageItem.defaultProps = {
  className: "blog-page",
  data: {},
};
