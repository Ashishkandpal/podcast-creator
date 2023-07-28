import React, { useState, useEffect } from "react";
import classes from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../firebase";
import toast from "react-hot-toast";
import { clearUser } from "../../../slices/userSlice";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [userFlag, setUserFlag] = useState(false);
  // const userFlag = false;
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();

  console.log(currentPath);

  useEffect(() => {
    // This effect will run once after the component mounts
    if (user) {
      setUserFlag(true);
    } else {
      setUserFlag(false);
    }
  }, [user]);

  const handleLogout = () => {
    console.log("logout");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(clearUser());
        // setUserFlag(false);
        toast.success("Logged out Successfully");
      })
      .catch((error) => {
        //An error happened
        toast.error(error.message);
      });
  };
  return (
    <div className={classes.navbar}>
      <div className={classes.gradient} />
      <div className={classes.links}>
        {userFlag ? (
          <Link
            to="#"
            className={currentPath === "/" ? classes.active : ""}
            onClick={handleLogout}
          >
            LogOut
          </Link>
        ) : (
          <Link
            to="/signup"
            className={currentPath === "/signup" ? classes.active : ""}
          >
            Sign up
          </Link>
        )}
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
          Create podcast
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
