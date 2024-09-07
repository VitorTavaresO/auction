import React, { useState, useEffect } from "react";
import "./Profile.css";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "primereact/image";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

const Profile = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    location: "-",
    image: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    const storedUserAddress = JSON.parse(localStorage.getItem("userAddress"));
    const storedUserAvatar = JSON.parse(localStorage.getItem("userAvatar"));
    if (storedUserData) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        name: storedUserData.firstName + " " + storedUserData.lastName,
        role: storedUserData.role || "Vendendor",
        phone: storedUserData.phone,
        email: storedUserData.email,
        image: storedUserAvatar || "/images/avatar.png",
      }));
    }
    if (storedUserAddress) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        location: storedUserAddress.city + " - " + storedUserAddress.state,
      }));
    }
  }, []);

  const handleEditUserDataClick = () => {
    navigate("/edit-user-data");
  };

  const cows = [
    { name: "Mimosa", price: "R$ 4.000,00", location: "Paranavaí - PR" },
    { name: "Betina", price: "R$ 5.500,00", location: "Nova Esperança - PR" },
    { name: "Gracinha", price: "R$ 5.000,00", location: "Alto Paraná - PR" },
  ];

  const filteredCows = cows.filter((cow) => {
    const matchesSearchTerm = cow.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCity = cityFilter
      ? cow.location.toLowerCase().includes(cityFilter.toLowerCase())
      : true;
    const matchesPrice = priceFilter
      ? parseFloat(cow.price.replace(/[^\d,]/g, "").replace(",", ".")) <=
        priceFilter
      : true;
    return matchesSearchTerm && matchesCity && matchesPrice;
  });

  return (
    <div className="min-h-screen flex justify-content-center bg-gray-400">
      <div className="grid sm:w-full lg:w-10">
        <Card className="col lg:col-4 h-30rem mt-5 mb-5 m-2 flex align-items-center justify-content-center text-center">
          <Avatar
            image={profile.image}
            shape="circle"
            className="w-7rem h-7rem"
          />
          <h2>{profile.name}</h2>
          <h3>{profile.role}</h3>
          <Button
            label="Editar Perfil"
            className="w-full h-2rem bg-gray-600 border-gray-600"
            onClick={handleEditUserDataClick}
          />
          <h3 className="stars">
            <i className="pi pi-star-fill m-1"></i>
            <i className="pi pi-star-fill m-1"></i>
            <i className="pi pi-star-fill m-1"></i>
            <i className="pi pi-star-fill m-1"></i>
            <i className="pi pi-star-fill m-1"></i>
          </h3>
          <h3>
            <i className="pi pi-phone m-1"></i>
            {profile.phone}
          </h3>
          <h4>
            <i className="pi pi-envelope m-1"></i>
            {profile.email}
          </h4>
          <h3>
            <i className="pi pi-map-marker m-1"></i>
            {profile.location}
          </h3>
        </Card>
        <Card className="col h-auto mt-5 mb-5 m-2 flex align-items-top justify-content-center text-center">
          <div className="p-inputgroup">
            <Link className="p-inputgroup-addon">
              <span>
                <i className="pi pi-search"></i>
              </span>
            </Link>
            <InputText
              placeholder="Busca"
              className="w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link
              className="p-inputgroup-addon"
              onClick={() => setShowFilters(!showFilters)}
            >
              <span>
                <i className="pi pi-filter-fill"></i>
              </span>
            </Link>
          </div>
          <div className={`filter-container ${showFilters ? "show" : ""}`}>
            <div className="p-inputgroup mt-3">
              <InputText
                placeholder="Cidade"
                className="w-full"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              />
              <InputNumber
                placeholder="Preço"
                className="w-full"
                value={priceFilter}
                onValueChange={(e) => setPriceFilter(e.value)}
                mode="currency"
                currency="BRL"
                locale="pt-BR"
              />
            </div>
          </div>
          <div className="grid m-5">
            {filteredCows.map((cow, index) => (
              <div key={index} className="col-12 lg:col-6">
                <Card
                  title={cow.name}
                  subTitle={cow.price}
                  header={<Image src="/images/novilha.jpg" preview />}
                  className="flex flex-column align-items-center justify-content-center text-center m-2"
                >
                  <p className="m-0">{cow.location}</p>
                </Card>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
