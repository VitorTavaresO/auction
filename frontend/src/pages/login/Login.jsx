import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Link, useNavigate } from "react-router-dom";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { Image } from "primereact/image";
import "primeflex/primeflex.css";
import style from "./Login.module.css";
import { useTranslation } from "react-i18next";
import PersonService from "../../services/PersonService";

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const personService = new PersonService();

  const handleLogin = async () => {
    try {
      const response = await personService.login({ email, password });
      if (response) {
        localStorage.setItem("user", JSON.stringify(response));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        if (errorMessage === "Person not found") {
          setErrorMessage(t("error.emailNotFound"));
        } else if (errorMessage === "Bad credentials") {
          setErrorMessage(t("error.invalidPassword"));
        } else {
          setErrorMessage(t("error.login"));
        }
      } else {
        setErrorMessage(t("error.login"));
      }
    }
  };

  return (
    <div className="h-screen flex align-items-center justify-content-center bg-gray-800">
      <Card
        className={`m-2 ${style["container-login"]} flex flex-column align-items-center justify-content-center text-center`}
      >
        <Image
          src="./images/logo.png"
          alt="Logo"
          width="250"
          className="logo mb-3"
        />
        <h2>{t("login.login")}</h2>
        <FloatLabel className="w-full mb-5">
          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          <label htmlFor="email">{t("login.email")}</label>
        </FloatLabel>
        <FloatLabel className="w-full mb-5">
          <Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputStyle={{ width: "100%" }}
            feedback={false}
            toggleMask
            className="w-full"
          />
          <label htmlFor="password">{t("login.password")}</label>
        </FloatLabel>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Link to="/forget-password" className="w-full">
          <Button
            label={t("login.forgot")}
            link
            className="mb-3 w-full text-green-500"
          />
        </Link>
        <Button
          label={t("login.submit")}
          className="w-full bg-green-500 border-green-500"
          onClick={handleLogin}
        />
        <Link to="/register" className="w-full">
          <Button
            label={t("login.register")}
            className="w-full mt-6 bg-green-500 border-green-500"
          />
        </Link>
      </Card>
    </div>
  );
};

export default Login;
