import React, { useState, memo } from "react";
import BlogItem from "./BlogItem/BlogItem";
import SectionHeading from "../generalComponents/SectionHeading/SectionHeading";
import Button from "../generalComponents/Button/Button";
import "./Blogs.scss";
import { useSelector } from "react-redux";
import { getBlogs, getBlogsIsLoading } from "../../store/Blogs/selectors";
import Loader from "../Loader/Loader";
import useLiveHashPush from "../../utils/hooks/useLiveHashPush";

const Blogs = ({ heading, anchorName, id }) => {
  const [countOfBlogs, setCountOfBlogs] = useState(3);
  let blogs = useSelector(getBlogs);
  const isLoading = useSelector(getBlogsIsLoading);
  const ref = useLiveHashPush(anchorName);
  const numOfBlogs = blogs.length;

  if (id) {
    blogs = blogs.filter((e) => e._id !== id);
  }

  const allBlogs = blogs.map((el) => (
    <BlogItem
      BlogCard={el}
      key={el._id}
      src={el.photo}
      title={el.title}
      text={el.text}
      fullText={el.fullText}
      linkText={el.buttonText}
      date={el.date}
      id={el._id}
    />
  ));

  const blogsContent = heading ? (
    <>
      <div className="blogs__container">
        <SectionHeading text={heading} />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="blogs__wrapper">
              {allBlogs.slice(0, countOfBlogs)}
            </div>
            {numOfBlogs > countOfBlogs && (
              <Button
                text="Показать больше статей"
                onClick={() => setCountOfBlogs(countOfBlogs + 3)}
                className="blogs__show-more"
              />
            )}
          </>
        )}
      </div>
    </>
  ) : (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="blogs__wrapper">
            {allBlogs.slice(0, countOfBlogs)}
          </div>
          {numOfBlogs > countOfBlogs && (
            <Button
              text="Показать больше статей"
              onClick={() => setCountOfBlogs(countOfBlogs + 3)}
              className="blogs__show-more"
            />
          )}
        </>
      )}
    </>
  );

  return (
    <section
      className="blogs__section"
      id={anchorName}
      ref={anchorName ? ref : null}
    >
      {blogsContent}
    </section>
  );
};

export default memo(Blogs);
