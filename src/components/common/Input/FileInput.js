import React, { useEffect, useState } from "react";
import classes from "./Input.module.css";

const FileInput = ({ accept, id, fileHandlerFunc, text, imgName }) => {
  const [file, setFile] = useState();
  const onChange = (e) => {
    console.log(e.target.files);
    setFile(e.target.files);
    fileHandlerFunc(e.target.files[0]);
  };
  useEffect(() => {
    setFile(null);
    console.log(file);
  }, [imgName]);
  return (
    <>
      <label
        htmlFor={id}
        className={`${classes.customInput} ${
          !file ? classes.labelInput : classes.active
        }`}
      >
        {file ? file[0].name : text}
      </label>
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </>
  );
};

export default FileInput;
