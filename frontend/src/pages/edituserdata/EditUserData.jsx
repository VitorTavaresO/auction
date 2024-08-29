import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import CpfValidation from "../../validation/cpfValidation";
import "./EditUserData.css";

const EditUserData = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCPF] = useState("");
  const [cpfInputType, setCpfInputType] = useState("text");
  const [cpfIsValid, setCpfIsValid] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneInputType, setPhoneInputType] = useState("text");
  const [cep, setCep] = useState("");
  const [cepInputType, setCepInputType] = useState("text");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data.address) {
            setStreet(data.address.road || "");
            setNeighborhood(
              data.address.neighbourhood || data.address.suburb || ""
            );
            setCity(
              data.address.city ||
                data.address.town ||
                data.address.village ||
                ""
            );
            setState(data.address.state || "");
            setCep(data.address.postcode || "");
          }
        } catch (error) {
          console.error("Erro ao buscar endereço:", error);
        }
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
      }
    );

    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    const storedUserAddress = JSON.parse(localStorage.getItem("userAddress"));
    const storedUserAvatar = localStorage.getItem("userAvatar");
    if (storedUserData) {
      setFirstName(storedUserData.firstName);
      setLastName(storedUserData.lastName);
      setCPF(storedUserData.cpf);
      console.log(storedUserData.cpf);
      setEmail(storedUserData.email);
      setPhone(storedUserData.phone);
      console.log(storedUserData.phone);
    }
    if (storedUserAddress) {
      setCep(storedUserAddress.cep || "");
      setStreet(storedUserAddress.street || "");
      setNumber(storedUserAddress.number || "");
      setNeighborhood(storedUserAddress.neighborhood || "");
      setCity(storedUserAddress.city || "");
      setState(storedUserAddress.state || "");
    }
    if (storedUserAvatar) {
      setUserAvatar(storedUserAvatar);
    }
  }, []);

  useEffect(() => {
    const isFormFilled = firstName && lastName && cpf && email && phone;
    setIsFormValid(isFormFilled);
  }, [firstName, lastName, cpf, email, phone]);

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

  const handleCepFocus = () => {
    setCepInputType("mask");
    setCep("");
  };

  const handleCpfFocus = () => {
    setCpfInputType("mask");
    setCPF("");
  };

  const handlePhoneFocus = () => {
    setPhoneInputType("mask");
    setPhone("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const filePath = `/public/images/${file.name}`;
      setUserAvatar(filePath);
      localStorage.setItem("userAvatar", filePath);
    }
  };

  const handleSubmit = () => {
    const userData = {
      firstName,
      lastName,
      cpf,
      email,
      phone,
    };
    const userAddress = {
      cep,
      street,
      number,
      neighborhood,
      city,
      state,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("userAddress", JSON.stringify(userAddress));
    navigate("/profile");
  };

  const fetchAddress = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado.");
        return;
      }

      setStreet(data.logradouro || "");
      setNeighborhood(data.bairro || "");
      setCity(data.localidade || "");
      setState(data.uf || "");
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
    }
  };

  const handleCepChange = (e) => {
    const newCep = e.target.value;
    setCep(newCep);

    if (newCep.length === 9) {
      fetchAddress(newCep);
    }
  };

  return (
    <div className="h-screen flex align-items-center justify-content-center">
      <Card className="m-2 container-EditUserData grid align-items-center justify-content-center text-center">
        <div className="grid">
          <div className="col-12"></div>
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
              <label htmlFor="first-name">First Name</label>
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
              <label htmlFor="last-name">Last Name</label>
            </FloatLabel>
          </div>
          <div className="sm:col-3 col-12">
            <FloatLabel className="w-full mb-5">
              {cpfInputType === "text" ? (
                <InputText
                  onChange={(e) => {
                    setCpfIsValid(CpfValidation(cpf));
                    setCPF(e.target.value);
                  }}
                  onFocus={handleCpfFocus}
                  onBlur={() => handleFieldBlur("cpf", cpf)}
                  required
                  value={cpf}
                  invalid={!cpfIsValid}
                  className={`w-full ${fieldErrors.cpf ? "p-invalid" : ""}`}
                />
              ) : (
                <InputMask
                  mask="999.999.999-99"
                  onChange={(e) => {
                    setCpfIsValid(CpfValidation(e.value));
                    setCPF(e.value);
                  }}
                  onFocus={() => handleFieldFocus("cpf")}
                  onBlur={() => handleFieldBlur("cpf", cpf)}
                  required
                  value={cpf}
                  invalid={!cpfIsValid}
                  className={`w-full ${fieldErrors.cpf ? "p-invalid" : ""}`}
                />
              )}
              <label htmlFor="cpf">CPF</label>
            </FloatLabel>
          </div>
          <div className="sm:col-3 col-12">
            <FloatLabel className="w-full mb-5">
              {phoneInputType === "text" ? (
                <InputText
                  onChange={(e) => setPhone(e.target.value)}
                  onFocus={handlePhoneFocus}
                  onBlur={() => handleFieldBlur("phone", phone)}
                  keyfilter="int"
                  required
                  value={phone}
                  className={`w-full ${fieldErrors.phone ? "p-invalid" : ""}`}
                />
              ) : (
                <InputMask
                  mask="(99) 99999-9999"
                  onChange={(e) => setPhone(e.value)}
                  onFocus={() => handleFieldFocus("phone")}
                  onBlur={() => handleFieldBlur("phone", phone)}
                  required
                  value={phone}
                  className={`w-full ${fieldErrors.phone ? "p-invalid" : ""}`}
                />
              )}
              <label htmlFor="phone">Phone</label>
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
              <label htmlFor="email">Email</label>
            </FloatLabel>
          </div>
          <div className="sm:col-3 col-12">
            <FloatLabel className="w-full mb-5">
              {cepInputType === "text" ? (
                <InputText
                  onChange={handleCepChange}
                  onFocus={handleCepFocus}
                  onBlur={() => handleFieldBlur("cep", cep)}
                  className={`w-full ${fieldErrors.cep ? "p-invalid" : ""}`}
                  value={cep}
                />
              ) : (
                <InputMask
                  mask="99999-999"
                  onChange={handleCepChange}
                  onFocus={() => handleFieldFocus("cep")}
                  onBlur={() => handleFieldBlur("cep", cep)}
                  className={`w-full ${fieldErrors.cep ? "p-invalid" : ""}`}
                  value={cep}
                />
              )}
              <label htmlFor="cep">CEP</label>
            </FloatLabel>
          </div>
          <div className="sm:col-9 col-12">
            <FloatLabel className="w-full mb-5">
              <InputText
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                onFocus={() => handleFieldFocus("street")}
                onBlur={() => handleFieldBlur("street", street)}
                className={`w-full ${fieldErrors.street ? "p-invalid" : ""}`}
              />
              <label htmlFor="street">Rua</label>
            </FloatLabel>
          </div>
          <div className="sm:col-3 col-12">
            <FloatLabel className="w-full mb-5">
              <InputText
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                onFocus={() => handleFieldFocus("number")}
                onBlur={() => handleFieldBlur("number", number)}
                className={`w-full ${fieldErrors.number ? "p-invalid" : ""}`}
              />
              <label htmlFor="number">Número</label>
            </FloatLabel>
          </div>
          <div className="sm:col-9 col-12">
            <FloatLabel className="w-full mb-5">
              <InputText
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                onFocus={() => handleFieldFocus("neighborhood")}
                onBlur={() => handleFieldBlur("neighborhood", neighborhood)}
                className={`w-full ${
                  fieldErrors.neighborhood ? "p-invalid" : ""
                }`}
              />
              <label htmlFor="neighborhood">Bairro</label>
            </FloatLabel>
          </div>
          <div className="sm:col-6 col-12">
            <FloatLabel className="w-full mb-5">
              <InputText
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onFocus={() => handleFieldFocus("city")}
                onBlur={() => handleFieldBlur("city", city)}
                className={`w-full ${fieldErrors.city ? "p-invalid" : ""}`}
              />
              <label htmlFor="city">Cidade</label>
            </FloatLabel>
          </div>
          <div className="sm:col-6 col-12">
            <FloatLabel className="w-full mb-5">
              <InputText
                value={state}
                onChange={(e) => setState(e.target.value)}
                onFocus={() => handleFieldFocus("state")}
                onBlur={() => handleFieldBlur("state", state)}
                className={`w-full ${fieldErrors.state ? "p-invalid" : ""}`}
              />
              <label htmlFor="state">Estado</label>
            </FloatLabel>
          </div>
          <div className="sm:col-12 col-12">
            <FileUpload
              mode="basic"
              accept="image/*"
              maxFileSize={1000000}
              customUpload
              uploadHandler={handleImageChange}
              className="w-full"
            />
          </div>
          <div className="sm:col-6 col-12">
            <Button
              label="Cancel"
              className="mb-3 w-full bg-red-500 border-red-500"
              onClick={handleGoBack}
            />
          </div>
          <div className="sm:col-6 col-12">
            <Button
              label="Submit"
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

export default EditUserData;
