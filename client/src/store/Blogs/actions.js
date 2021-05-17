import { LOADING_BLOGS, TOGGLE_IS_LOADING_BLOGS, ADD_NEW_BLOG, UPDATE_BLOG } from "./actionTypes";

export const setBlogs = (blogsArr) => ({
  type: LOADING_BLOGS,
  payload: blogsArr,
});

export const BlogsIsLoading = (isLoading) => ({
  type: TOGGLE_IS_LOADING_BLOGS,
  payload: isLoading,
});
export const addNewBlog = (newBlog) => ({
  type: ADD_NEW_BLOG,
  payload: newBlog,
});
export const updateBlogs = (blogsArr) => ({
  type: UPDATE_BLOG,
  payload: blogsArr,
});