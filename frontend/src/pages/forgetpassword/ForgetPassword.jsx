import "./ForgetPassword.css";
import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { Image } from "primereact/image";
import "primeflex/primeflex.css";
const ForgetPassword = () => {
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
    <div className="forget-password flex align-items-center justify-content-center bg-yellow-100">
      <Card className="sm:w-30rem flex flex-column align-items-center justify-content-center text-center">
        <Image
          src="./images/logo.png"
          alt="Logo"
          width="250"
          className="logo mb-3"
        />
        <h2>Recover Password</h2>
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

export default ForgetPassword;
