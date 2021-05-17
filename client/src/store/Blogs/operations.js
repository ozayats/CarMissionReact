import { setBlogs, BlogsIsLoading, updateBlogs } from "./actions";
import axios from "axios";
import { getBlogs } from "./selectors";
import { toastr } from "react-redux-toastr";

export const loadBlogs = () => (dispatch) => {
  dispatch(BlogsIsLoading(true));

  axios("/api/blogs/")
    .then((res) => {
      dispatch(setBlogs(res.data.sort((a, b) => b.date - a.date)));
      dispatch(BlogsIsLoading(false));
    })
    .catch((err) => {
      toastr.error(err.response.data.message);
    });
};

export const filterBlogs = (id) => (dispatch, getStore) => {
  const blogs = getBlogs(getStore());

  const filtered = blogs.filter((blog) => blog._id !== id);
  dispatch(updateBlogs(filtered));
};

export const updateBlogByNewSrc = (src, id) => (dispatch, getStore) => {
  const blogs = getBlogs(getStore());

  const updated = blogs.map((blog) => {
    if (blog._id === id) {
      return {
        ...blog,
        photo: src,
      };
    } else {
      return blog;
    }
  });

  dispatch(updateBlogs(updated));
};

export const updateBlogsByNewObject = (newBlog) => (dispatch, getStore) => {
  const blogs = getBlogs(getStore());

  const updated = blogs.map((blog) => {
    if (blog._id === newBlog._id) {
      return newBlog;
    } else {
      return blog;
    }
  });

  dispatch(updateBlogs(updated));
};
