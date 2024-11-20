import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PersonService from "../../services/PersonService";

const RegisterConfirmation = () => {
  const { email, code } = useParams();
  const navigate = useNavigate();
  const personService = new PersonService();

  const validateEmail = async () => {
    try {
      const response = await personService.emailValidation(email, code);
      if (response) {
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (error) {
      console.error("Email validation failed:", error);
    }
  };

  useEffect(() => {
    validateEmail();
  }, [email, code, navigate, personService]);

  return (
    <div className="h-screen flex align-items-center justify-content-center bg-gray-800">
      <div className="card">
        <h1>Register Confirmation</h1>
        <h2>
          Email validated successfully! You will be redirected to the login
          screen in 5 seconds.
        </h2>
      </div>
    </div>
  );
};

export default RegisterConfirmation;
