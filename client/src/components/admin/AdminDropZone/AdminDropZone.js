import React, { useCallback, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { dropZone, previewStyles } from "./styles";
import Button from "../../generalComponents/Button/Button";

const AdminDropZone = ({ setFile, imgURL, file }) => {
  const [image, setImage] = useState({});

  const onDrop = useCallback(
    (acceptedFiles) => {
      const [image] = acceptedFiles;
      const file = new FormData();
      file.append("image", image);
      setFile(file);

      setImage(
        Object.assign(image, {
          preview: URL.createObjectURL(image),
        })
      );
    },
    [setFile]
  );

  const deleteDroppedImg = (e) => {
    e.preventDefault();

    setImage({});
    setFile(null);
  };

  const thumbs = (
    <div style={previewStyles.thumb}>
      <div style={previewStyles.thumbInner}>
        <img
          src={image.preview || imgURL}
          style={previewStyles.img}
          alt="preview"
        />
        {file && (
          <Button
            text="Удалить"
            className="admin-stages__delete-img-btn"
            onClick={deleteDroppedImg}
          />
        )}
      </div>
    </div>
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop,
  });

  const style = useMemo(
    () => ({
      ...dropZone.baseStyle,
      ...(isDragActive ? dropZone.activeStyle : {}),
      ...(isDragAccept ? dropZone.acceptStyle : {}),
      ...(isDragReject ? dropZone.rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Перетащите файл или кликните для выбора файла</p>
      </div>
      <aside style={previewStyles.thumbsContainer}>{thumbs}</aside>
    </div>
  );
};

export default AdminDropZone;
