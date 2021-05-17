import React, { useEffect } from "react";
import Blogs from "../../../components/Blogs/Blogs";
import { useSelector } from "react-redux";
import { getBlogs, getBlogsIsLoading } from "../../../store/Blogs/selectors";
import { useLocation } from "react-router-dom";
import "./BlogPageContainer.scss";
import Loader from "../../../components/Loader/Loader";
import BlogPageItem from "../PageItem/BlogPageItem";
import BlogPageErrorItem from "../PageItem/BlogPageErrorItem";

const BlogPage = ({ match }) => {
  const blogsData = useSelector(getBlogs);
  const isLoading = useSelector(getBlogsIsLoading);
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const mainClassName = "blog-page";
  const blogId = match.params.id;
  const blog = blogsData.find(e => e._id === blogId);
  const pageContent = blog ? <BlogPageItem className={mainClassName} data={blog} /> : <BlogPageErrorItem />
  
  if(isLoading) {
    return <Loader data-testid="loader"/>
  }

  return (
    <div className={`${mainClassName}__container`}>
      {pageContent}
      <div className={`${mainClassName}__other-blogs`}>
        <Blogs id={blogId}/>
      </div>
    </div>
  );
};

export default BlogPage;