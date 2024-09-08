import style from "./ForgetPassword.module.css";
import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { Image } from "primereact/image";
import "primeflex/primeflex.css";
import { useTranslation } from "react-i18next";

const ForgetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const [email, setEmail] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const isFormFilled = email;
    setIsFormValid(isFormFilled);
  }, [email]);

  const handleFieldFocus = (field) => {
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [field]: false,
    }));
  };

  const handleFieldBlur = (field, value) => {
    if (!value) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [field]: true,
      }));
    }
  };

  return (
    <div className="h-screen flex align-items-center justify-content-center bg-gray-800">
      <Card
        className={`m-2 ${style["container-forget-password"]} flex flex-column align-items-center justify-content-center text-center`}
      >
        <Image
          src="./images/logo.png"
          alt="Logo"
          width="250"
          className="logo mb-3"
        />
        <h2>{t("forgetPassword.recover")}</h2>
        <FloatLabel className="w-full mb-5">
          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => handleFieldFocus("email")}
            onBlur={() => handleFieldBlur("email", email)}
            keyfilter="email"
            required
            className={`w-full ${fieldErrors.email ? "p-invalid" : ""}`}
          />
          <label htmlFor="email">{t("forgetPassword.email")}</label>
        </FloatLabel>
        <Button
          label={t("forgetPassword.cancel")}
          className="mb-3 w-full bg-red-500 border-red-500"
          onClick={handleGoBack}
        />
        <Button
          label={t("forgetPassword.submit")}
          className={`mb-4 w-full ${
            isFormValid
              ? "bg-green-500 border-green-500"
              : "bg-gray-500 border-gray-500"
          }`}
          disabled={!isFormValid}
        />
      </Card>
    </div>
  );
};

export default ForgetPassword;
