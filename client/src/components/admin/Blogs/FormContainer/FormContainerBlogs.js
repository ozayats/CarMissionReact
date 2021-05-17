import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getBlogs } from "../../../../store/Blogs/selectors";
import FormItemBlogs from "../FormItem/FormItemBlogs";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";
import "./FormContainerBlogs.scss";
import Button from "../../../generalComponents/Button/Button";
import {
  filterBlogs,
  updateBlogByNewSrc,
  updateBlogsByNewObject,
} from "../../../../store/Blogs/operations";
import enhanceFormItem from "../../../hoc/enhanceFromItem";
import { addNewBlog } from "../../../../store/Blogs/actions";

const config = {
  dropZone: true,
  canBeDeleted: true,
  pathProp: "photo",
  routes: {
    post: "/api/blogs/",
    put: "/api/blogs/",
    delete: "/api/blogs/delete/",
    upload: "/api/blogs/upload/",
  },
  actions: {
    filterDeleted: filterBlogs,
    updateS3Link: updateBlogByNewSrc,
    addNew: addNewBlog,
    updateInRedux: updateBlogsByNewObject,
  },
};

const FormContainerBlogs = () => {
  const [formList, setFormList] = useState([]);
  const data = useSelector(getBlogs);

  useEffect(() => {
    const mapFormToRender = () => {
      return data.map((blog) => {
        const Enhanced = enhanceFormItem(FormItemBlogs, config);
        return <Enhanced sourceObj={blog} key={blog._id} />;
      });
    };

    setFormList(mapFormToRender());
  }, [data]);

  const createNewFormItem = () => {
    const empty = {
      photo: "",
      title: "",
      text: "",
      fullText: "",
      buttonText: "ПЕРЕЙТИ К СТАТЬЕ",
    };
    const Enhanced = enhanceFormItem(FormItemBlogs, config);
    return <Enhanced sourceObj={empty} isNew key={Date.now()} />;
  };

  const handleAddItem = () => {
    const form = createNewFormItem();

    const updated = formList.map((i) => i);
    updated.push(form);
    setFormList(updated);
  };

  return (
    <div className="admin-blogs">
      <SectionHeading text="Блог" />
      <div className="admin-blogs__form-container">{formList}</div>
      <Button
        text="+"
        className="admin-blogs__add-btn"
        onClick={handleAddItem}
      />
    </div>
  );
};
export default FormContainerBlogs;
