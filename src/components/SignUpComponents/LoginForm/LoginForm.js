import React, { useState } from "react";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("log in");
    setLoading(true);
    if (email && password) {
      try {
        // Creating user's account
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("user", user);

        //Saving user's details
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        console.log("userData", userData);

        //Save data in redux, call the redux action
        dispatch(
          setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
          })
        );
        toast.success("Login Successful");
        setLoading(false);
        navigate("/profile");
      } catch (e) {
        console.log("error", e);
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("Make sure email and passoword are not empty");
    }
  };
  return (
    <>
      <h1>Log in</h1>
      <Input
        state={email}
        setState={setEmail}
        placeholder="Email"
        type="email"
        required={true}
      />
      <Input
        state={password}
        setState={setPassword}
        placeholder="Password"
        type="password"
        required={true}
      />
      <Button
        text={loading ? "loading..." : "log in"}
        onClick={handleLogin}
        disabled={loading}
      />
    </>
  );
};

export default LoginForm;
