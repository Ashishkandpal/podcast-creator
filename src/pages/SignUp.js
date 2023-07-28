import React, { useState } from "react";
import Header from "../components/common/Header/Header";
import LoginForm from "../components/SignUpComponents/LoginForm/LoginForm";
import SignUpForm from "../components/SignUpComponents/SignUpForm/SignUpForm";

const SignUp = () => {
  const [flag, setFlag] = useState("");

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        {!flag ? <SignUpForm /> : <LoginForm />}
        {!flag ? (
          <p className="signup-login-toggle" onClick={() => setFlag(!flag)}>
            Already have an Account? Click here to Login.
          </p>
        ) : (
          <p className="signup-login-toggle" onClick={() => setFlag(!flag)}>
            Don't have an account? Click here to sign up
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
