import React from "react";
import PropTypes from "prop-types";
import Image from "../../../components/Image/Image";
import SectionHeading from "../../../components/generalComponents/SectionHeading/SectionHeading";
import { useDispatch } from "react-redux";
import Button from "../../../components/generalComponents/Button/Button";
import { showFeedbackFormAction } from "../../../store/FeedbackForm/actions";

const BlogPageErrorItem = ({
  className, img, title, text
}) => {
  const dispatch = useDispatch();

  return (
    <>
      <Image src={img} className={`${className}__img`} alt="blog-img"/>
      <div className={`${className}__side-line`}>
        <div data-testid="errorPageTextContent" className={`${className}__text-content`}>
          <SectionHeading text={title} className={`${className}__header`}/>
          <SectionHeading text={text} className={`${className}__header`}/>
        </div>
        <Button
          className={`${className}__button`}
          text="Подобрать хорошее авто"
          onClick={() => dispatch(showFeedbackFormAction)}
        />
      </div>
    </>
  );
};

export default BlogPageErrorItem;

BlogPageErrorItem.propTypes = {
  className: PropTypes.string,
  img: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
}

BlogPageErrorItem.defaultProps = {
  className: "blog-page",
  img: "/img/blogs/error-blog.jpg",
  title: "Ой, кажется такой блог не найден!",
  text: "Если не хочешь езить на таком же авто, свяжись с нами или выбери другую новость ниже на странице."
}
