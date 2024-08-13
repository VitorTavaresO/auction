import "./Login.css";
import React from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { Image } from "primereact/image";
import "primeflex/primeflex.css";

const Login = () => {
  return (
    <div className="login flex align-items-center justify-content-center bg-yellow-100">
      <Card className="m-5 sm:w-30rem md:w-40rem lg:w-50rem xl:w-60rem flex flex-column align-items-center justify-content-center text-center">
        <Image
          src="./images/logo.png"
          alt="Logo"
          width="250"
          className="logo mb-3"
        />
        <h2>Login</h2>
        <FloatLabel className="w-full mb-5 sm:w-25rem md:w-35rem lg:w-45rem xl:w-55rem">
          <InputText className="w-full" />
          <label htmlFor="email">Email</label>
        </FloatLabel>
        <FloatLabel className="w-full mb-5 sm:w-25rem md:w-35rem lg:w-45rem xl:w-55rem">
          <Password
            inputStyle={{ width: "100%" }}
            feedback={false}
            toggleMask
            className="w-full"
          />
          <label htmlFor="password">Password</label>
        </FloatLabel>
        <Link to="/forgetpassword" className="w-full">
          <Button
            label="Forget Password?"
            link
            className="mb-3 w-full text-green-500"
          />
        </Link>
        <Button
          label="Submit"
          className="w-full bg-green-500 border-green-500"
        />
        <Link to="/register" className="w-full">
          <Button
            label="Register"
            className="w-full mt-6 bg-green-500 border-green-500"
          />
        </Link>
      </Card>
    </div>
  );
};

export default Login;
