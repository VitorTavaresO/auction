import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import "./Register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
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
      birthday &&
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
    birthday,
    email,
    phone,
    password,
    confirmPassword,
    passwordCriteria,
  ]);

  const header = <div className="font-bold mb-3">Chose a Password</div>;
  const footer = (
    <>
      <Divider />
      <p className="mt-2">Sugestões</p>
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
    <div className="flex align-items-center justify-content-center bg-yellow-100">
      <Card className="m-5 sm:w-30rem md:w-40rem lg:w-50rem xl:w-60rem flex flex-column align-items-center justify-content-center text-center">
        <Image
          src="./images/logo.png"
          alt="Logo"
          width="250"
          className="logo mb-3"
        />
        <h2>Register</h2>
        <FloatLabel className="w-full mb-5 sm:w-25rem md:w-35rem lg:w-45rem xl:w-55rem">
          <InputText
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onFocus={() => handleFieldFocus("firstName")}
            onBlur={() => handleFieldBlur("firstName", firstName)}
            required
            className={`w-full ${fieldErrors.firstName ? "p-invalid" : ""}`}
          />
          <label htmlFor="first-name">First Name</label>
        </FloatLabel>
        <FloatLabel className="w-full mb-5 sm:w-25rem md:w-35rem lg:w-45rem xl:w-55rem ">
          <InputText
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onFocus={() => handleFieldFocus("lastName")}
            onBlur={() => handleFieldBlur("lastName", lastName)}
            required
            className={`w-full ${fieldErrors.lastName ? "p-invalid" : ""}`}
          />
          <label htmlFor="last-name">Last Name</label>
        </FloatLabel>
        <FloatLabel className="w-full mb-5 sm:w-25rem md:w-35rem lg:w-45rem xl:w-55rem">
          <Calendar
            value={birthday}
            onChange={(e) => setBirthday(e.value)}
            onFocus={() => handleFieldFocus("birthday")}
            onBlur={() => handleFieldBlur("birthday", birthday)}
            required
            className={`w-full ${fieldErrors.birthday ? "p-invalid" : ""}`}
          />
          <label htmlFor="birthday">Birthday</label>
        </FloatLabel>
        <FloatLabel className="w-full mb-5 sm:w-25rem md:w-35rem lg:w-45rem xl:w-55rem">
          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => handleFieldFocus("email")}
            onBlur={() => handleFieldBlur("email", email)}
            keyfilter="email"
            required
            className={`w-full ${fieldErrors.email ? "p-invalid" : ""}`}
          />
          <label htmlFor="email">Email</label>
        </FloatLabel>
        <FloatLabel className="w-full mb-5 sm:w-25rem md:w-35rem lg:w-45rem xl:w-55rem">
          <InputText
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onFocus={() => handleFieldFocus("phone")}
            onBlur={() => handleFieldBlur("phone", phone)}
            keyfilter="int"
            required
            className={`w-full ${fieldErrors.phone ? "p-invalid" : ""}`}
          />
          <label htmlFor="phone">Phone</label>
        </FloatLabel>
        <FloatLabel className="w-full mb-5 sm:w-25rem md:w-35rem lg:w-45rem xl:w-55rem">
          <Password
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
          <label htmlFor="password">Password</label>
        </FloatLabel>
        <FloatLabel className="w-full mb-5 sm:w-25rem md:w-35rem lg:w-45rem xl:w-55rem">
          <Password
            toggleMask
            value={confirmPassword}
            onChange={handlePasswordConfirmation}
            onFocus={() => handleFieldFocus("confirmPassword")}
            onBlur={() => handleFieldBlur("confirmPassword", confirmPassword)}
            feedback={false}
            required
            className={`w-full ${
              fieldErrors.confirmPassword ? "p-invalid" : ""
            }`}
          />
          <label htmlFor="confirm-password">Confirm Password</label>
        </FloatLabel>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Button
          label="Cancel"
          className="mb-4 mt-5 w-full bg-red-500 border-red-500"
        />
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

export default Register;
