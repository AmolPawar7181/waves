import React from "react";
import Mybutton from "../utils/button";
import Login from "./login";

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customers</h1>
            <p>Lorem Ipsum dolor sit amet</p>
            <Mybutton
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{ margin: "10px 0 0 0" }}
            />
          </div>
          <div className="right">
            <h2>Registered customer</h2>
            <p>If you have an account please log in.</p>
            <Login />
          </div>
        </div>
        <div className="left"></div>
      </div>
    </div>
  );
};

export default RegisterLogin;
