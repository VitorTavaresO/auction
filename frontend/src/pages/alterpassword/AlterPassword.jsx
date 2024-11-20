import style from "./AlterPassword.module.css";
import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { Image } from "primereact/image";
import "primeflex/primeflex.css";
import { useTranslation } from "react-i18next";
import PersonService from "../../services/PersonService";

const AlterPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const personService = new PersonService();

  const handleGoBack = () => {
    navigate(-1);
  };

  const [validationCode, setValidationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  useEffect(() => {
    const isPasswordValid = Object.values(passwordCriteria).every(Boolean);
    const isFormFilled =
      password &&
      confirmPassword &&
      isPasswordValid &&
      password === confirmPassword;
    setIsFormValid(isFormFilled);
  }, [password, confirmPassword, passwordCriteria]);

  const header = (
    <div className="font-bold mb-3">{t("alterPassword.alter")}</div>
  );
  const footer = (
    <>
      <Divider />
      <p className="mt-2">{t("password.required")}</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li
          className={
            passwordCriteria.hasLowerCase ? "text-green-500" : "text-red-500"
          }
        >
          {t("password.lowercase")}
        </li>
        <li
          className={
            passwordCriteria.hasUpperCase ? "text-green-500" : "text-red-500"
          }
        >
          {t("password.uppercase")}
        </li>
        <li
          className={
            passwordCriteria.hasNumber ? "text-green-500" : "text-red-500"
          }
        >
          {t("password.number")}
        </li>
        <li
          className={
            passwordCriteria.hasSpecialChar ? "text-green-500" : "text-red-500"
          }
        >
          {t("password.special")}
        </li>
        <li
          className={
            passwordCriteria.minLength ? "text-green-500" : "text-red-500"
          }
        >
          {t("password.length")}
        </li>
      </ul>
    </>
  );

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordCriteria({
      minLength: newPassword.length >= 6,
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasLowerCase: /[a-z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    });
  };

  const handlePasswordConfirmation = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    if (password !== confirmPassword) {
      setErrorMessage(t("password.match"));
    } else {
      setErrorMessage("");
    }
  };

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

  const handleSubmit = async () => {
    const email = localStorage.getItem("emailRecovery");
    const newPassword = password;
    try {
      const response = await personService.recoveryPassword({
        email,
        validationCode,
        newPassword,
      });
      if (response) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Invalid code"
      );
    }
  };

  return (
    <div className="h-screen flex align-items-center justify-content-center bg-gray-800">
      <Card
        className={`m-2 ${style["container-alter-password"]} flex flex-column align-items-center justify-content-center text-center`}
      >
        <Image
          src="./images/logo.png"
          alt="Logo"
          width="250"
          className="logo mb-3"
        />
        <h2>{t("alterPassword.alter")}</h2>
        <FloatLabel className="w-full mb-5">
          <InputText
            value={validationCode}
            onChange={(e) => setValidationCode(e.target.value)}
            onFocus={() => handleFieldFocus("validationCode")}
            onBlur={() => handleFieldBlur("validationCode", validationCode)}
            required
            className={`w-full ${fieldErrors.email ? "p-invalid" : ""}`}
          />
          <label htmlFor="validationCode">
            {t("alterPassword.validationCode")}
          </label>
        </FloatLabel>
        <FloatLabel className="w-full mb-5">
          <Password
            inputStyle={{ width: "100%" }}
            toggleMask
            value={password}
            onChange={handlePasswordChange}
            onFocus={() => {
              handleFieldFocus("password");
              setIsPasswordFocused(true);
            }}
            onBlur={() => handleFieldBlur("password", password)}
            header={header}
            footer={footer}
            invalid={
              isPasswordFocused &&
              !Object.values(passwordCriteria).every(Boolean)
            }
            className={`w-full w-10rem' ${
              fieldErrors.password ? "p-invalid" : ""
            }`}
          />
          <label htmlFor="password">{t("alterPassword.newPassword")}</label>
        </FloatLabel>
        <FloatLabel className="w-full mb-5">
          <Password
            inputStyle={{ width: "100%" }}
            toggleMask
            value={confirmPassword}
            onChange={handlePasswordConfirmation}
            onFocus={() => handleFieldFocus("confirmPassword")}
            onBlur={() => handleFieldBlur("confirmPassword", confirmPassword)}
            feedback={false}
            required
            className={`w-full w-10rem' ${
              fieldErrors.confirmPassword ? "p-invalid" : ""
            }`}
          />
          <label htmlFor="confirm-password">
            {t("alterPassword.confirmPassword")}
          </label>
        </FloatLabel>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Button
          label={t("alterPassword.cancel")}
          className="mb-3 w-full bg-red-500 border-red-500"
          onClick={handleGoBack}
        />
        <Button
          label={t("alterPassword.submit")}
          className={`mb-4 w-full ${
            isFormValid
              ? "bg-green-500 border-green-500"
              : "bg-gray-500 border-gray-500"
          }`}
          disabled={!isFormValid}
          onClick={handleSubmit}
        />
      </Card>
    </div>
  );
};

export default AlterPassword;
