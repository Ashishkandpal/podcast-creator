import React from "react";
import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes["wrapper"]}>
      <span className={classes["loader"]}></span>
    </div>
  );
};

export default Loader;
