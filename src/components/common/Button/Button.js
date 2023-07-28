import React from "react";
import classes from "./Button.module.css";

const Button = ({ text, onClick, disabled, style }) => {
  return (
    <div
      className={classes.customBtn}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {text}
    </div>
  );
};

export default Button;
