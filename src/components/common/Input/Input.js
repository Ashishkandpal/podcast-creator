import React from "react";
import classes from "./Input.module.css";

const Input = ({ type, state, setState, placeholder, required }) => {
  return (
    <input
      type={type}
      value={state}
      onChange={(e) => setState(e.target.value)}
      placeholder={placeholder}
      required={required}
      className={classes.customInput}
    />
  );
};

export default Input;
