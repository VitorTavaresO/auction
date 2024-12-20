import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { InputMask } from "primereact/inputmask";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import CpfValidation from "../../validation/cpfValidation";
import style from "./Register.module.css";
import { useTranslation } from "react-i18next";
import PersonService from "../../services/PersonService";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const personService = new PersonService();

  const handleGoBack = () => {
    navigate(-1);
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCPF] = useState("");
  const [cpfIsValid, setCpfIsValid] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
  const [isFormValid, setIsFormValid] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  useEffect(() => {
    const isPasswordValid = Object.values(passwordCriteria).every(Boolean);
    const isFormFilled =
      firstName &&
      lastName &&
      cpf &&
      email &&
      phone &&
      password &&
      confirmPassword &&
      isPasswordValid &&
      password === confirmPassword;
    setIsFormValid(isFormFilled);
  }, [
    firstName,
    lastName,
    cpf,
    email,
    phone,
    password,
    confirmPassword,
    passwordCriteria,
  ]);

  const header = <div className="font-bold mb-3">{t("password.choose")}</div>;
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
    const name = `${firstName} ${lastName}`;
    try {
      const response = await personService.register({
        name,
        cpf,
        email,
        phone,
        password,
      });

      if (response) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error.response && error.response.data
          ? error.response.data
          : "Register error"
      );
    }
  };

  return (
    <div className="h-screen flex align-items-center justify-content-center bg-gray-800">
      <Card
        className={`m-2 ${style["container-register"]} grid align-items-center justify-content-center text-center`}
      >
        <div className="grid">
          <div className="col-12">
            <Image
              src="./images/logo.png"
              alt="Logo"
              width="250"
              className="logo mb-3"
            />
          </div>
          <div className="sm:col-6 col-12">
            <FloatLabel className="w-full mb-5">
              <InputText
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onFocus={() => handleFieldFocus("firstName")}
                onBlur={() => handleFieldBlur("firstName", firstName)}
                required
                className={`w-full ${fieldErrors.firstName ? "p-invalid" : ""}`}
              />
              <label htmlFor="first-name">{t("register.firstName")}</label>
            </FloatLabel>
          </div>
          <div className="sm:col-6 col-12">
            <FloatLabel className="w-full mb-5">
              <InputText
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onFocus={() => handleFieldFocus("lastName")}
                onBlur={() => handleFieldBlur("lastName", lastName)}
                required
                className={`w-full ${fieldErrors.lastName ? "p-invalid" : ""}`}
              />
              <label htmlFor="last-name">{t("register.lastName")}</label>
            </FloatLabel>
          </div>
          <div className="sm:col-3 col-12">
            <FloatLabel className="w-full mb-5">
              <InputMask
                value={cpf}
                mask="999.999.999-99"
                onChange={(e) => {
                  setCpfIsValid(CpfValidation(cpf));
                  setCPF(e.value);
                }}
                onFocus={() => handleFieldFocus("cpf")}
                onBlur={() => handleFieldBlur("cpf", cpf)}
                required
                invalid={!cpfIsValid}
                className={`w-full ${fieldErrors.cpf ? "p-invalid" : ""}`}
              />
              <label htmlFor="cpf">{t("register.cpf")}</label>
            </FloatLabel>
          </div>
          <div className="sm:col-3 col-12">
            <FloatLabel className="w-full mb-5">
              <InputMask
                value={phone}
                mask="(99) 99999-9999"
                onChange={(e) => setPhone(e.target.value)}
                onFocus={() => handleFieldFocus("phone")}
                onBlur={() => handleFieldBlur("phone", phone)}
                keyfilter="int"
                required
                className={`w-full ${fieldErrors.phone ? "p-invalid" : ""}`}
              />
              <label htmlFor="phone">{t("register.phone")}</label>
            </FloatLabel>
          </div>
          <div className="sm:col-6 col-12">
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
              <label htmlFor="email">{t("register.email")}</label>
            </FloatLabel>
          </div>
          <div className="sm:col-6 col-12">
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
                className={`w-full ${fieldErrors.password ? "p-invalid" : ""}`}
              />
              <label htmlFor="password">{t("register.password")}</label>
            </FloatLabel>
          </div>
          <div className="sm:col-6 col-12">
            <FloatLabel className="w-full mb-5">
              <Password
                inputStyle={{ width: "100%" }}
                toggleMask
                value={confirmPassword}
                onChange={handlePasswordConfirmation}
                onFocus={() => handleFieldFocus("confirmPassword")}
                onBlur={() =>
                  handleFieldBlur("confirmPassword", confirmPassword)
                }
                feedback={false}
                required
                className={`w-full ${
                  fieldErrors.confirmPassword ? "p-invalid" : ""
                }`}
              />
              <label htmlFor="confirm-password">
                {t("register.confirmPassword")}
              </label>
            </FloatLabel>
          </div>
          <div className="col-12">
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
          <div className="sm:col-6 col-12">
            <Button
              label={t("register.cancel")}
              className="mb-3 w-full bg-red-500 border-red-500"
              onClick={handleGoBack}
            />
          </div>
          <div className="sm:col-6 col-12">
            <Button
              label={t("register.submit")}
              className={`mb-4 w-full ${
                isFormValid
                  ? "bg-green-500 border-green-500"
                  : "bg-gray-500 border-gray-500"
              }`}
              disabled={!isFormValid}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;
