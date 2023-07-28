import React, { useState } from "react";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import { auth, db, storage } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    console.log("sign up");
    setLoading(true);
    if (
      password === confirmPassword &&
      password.length >= 6 &&
      fullName &&
      email
    ) {
      try {
        // Creating user's account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("user", user);

        //Saving user's details
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
        });

        //Save data in redux, call the redux action
        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
          })
        );
        toast.success("Account Created");
        setLoading(false);
        navigate("/profile");
      } catch (e) {
        console.log("error", e);
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      if (fullName.length === 0) {
        toast.error("Name can't be empty");
      } else if (email.length === 0) {
        toast.error("Email can't be empty");
      } else if (password !== confirmPassword) {
        toast.error("passwords don't match");
      } else if (password.length < 6) {
        toast.error("Password is shorter than 6 digits");
      }
      setLoading(false);
    }
  };
  return (
    <>
      <h1>Sign Up</h1>
      <Input
        state={fullName}
        setState={setFullName}
        placeholder="Full Name"
        type="text"
        required={true}
      />
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
      <Input
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder="Password"
        type="password"
        required={true}
      />
      <Button
        text={loading ? "Loading..." : "Sign Up"}
        disabled={loading}
        onClick={handleSignUp}
      />
    </>
  );
};

export default SignUpForm;
