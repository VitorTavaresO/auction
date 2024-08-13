import "./AlterPassword.css";
import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { Image } from "primereact/image";
import "primeflex/primeflex.css";
const AlterPassword = () => {
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

  const header = <div className="font-bold mb-3">Choose a Password</div>;
  const footer = (
    <>
      <Divider />
      <p className="mt-2">Required</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li
          className={
            passwordCriteria.hasLowerCase ? "text-green-500" : "text-red-500"
          }
        >
          At least one lowercase
        </li>
        <li
          className={
            passwordCriteria.hasUpperCase ? "text-green-500" : "text-red-500"
          }
        >
          At least one uppercase
        </li>
        <li
          className={
            passwordCriteria.hasNumber ? "text-green-500" : "text-red-500"
          }
        >
          At least one numeric
        </li>
        <li
          className={
            passwordCriteria.hasSpecialChar ? "text-green-500" : "text-red-500"
          }
        >
          At least one special character
        </li>
        <li
          className={
            passwordCriteria.minLength ? "text-green-500" : "text-red-500"
          }
        >
          Minimum 6 characters
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
      setErrorMessage("Passwords must match.");
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

  return (
    <div className="alter-password flex align-items-center justify-content-center bg-yellow-100">
      <Card className="sm:w-30rem flex flex-column align-items-center justify-content-center text-center">
        <Image
          src="./images/logo.png"
          alt="Logo"
          width="250"
          className="logo mb-3"
        />
        <h2>New Password</h2>
        <FloatLabel className="w-full mb-5 sm:w-25rem md:w-35rem lg:w-45rem xl:w-55rem">
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
          <label htmlFor="password">Password</label>
        </FloatLabel>
        <FloatLabel className="w-full mb-5 sm:w-25rem md:w-35rem lg:w-45rem xl:w-55rem">
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
          <label htmlFor="confirm-password">Confirm Password</label>
        </FloatLabel>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Link to="/login" className="w-full">
          <Button
            label="Cancel"
            className="mb-3 w-full bg-red-500 border-red-500"
          />
        </Link>
        <Button
          label="Submit"
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

export default AlterPassword;
