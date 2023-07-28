import React from "react";
import classes from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);
  return (
    <div className={classes.navbar}>
      <div className={classes.gradient} />
      <div className={classes.links}>
        <Link to="/" className={currentPath === "/" ? classes.active : ""}>
          Sign up
        </Link>
        <Link
          to="/podcasts"
          className={currentPath === "/podcasts" ? classes.active : ""}
        >
          Podcasts
        </Link>
        <Link
          to="/create-a-podcast"
          className={currentPath === "/create-a-podcast" ? classes.active : ""}
        >
          Create new podcast
        </Link>
        <Link
          to="/profile"
          className={currentPath === "/profile" ? classes.active : ""}
        >
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Header;
