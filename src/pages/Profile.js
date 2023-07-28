import React from "react";
import Header from "../components/common/Header/Header";
import { useSelector } from "react-redux";
import Button from "../components/common/Button/Button";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import Loader from "../components/common/Loader/Loader";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  console.log("My User", user);
  if (!user) {
    return <Loader />;
  }
  const handleLogout = () => {
    console.log("logout");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("Logged out Successfully");
      })
      .catch((error) => {
        //An error happened
        toast.error(error.message);
      });
  };
  return (
    <div>
      <Header />
      <h1>{user.name}</h1>
      <Button text={"logout"} onClick={handleLogout} />
    </div>
  );
};

export default Profile;
