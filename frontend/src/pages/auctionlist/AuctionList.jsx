import React, { useState } from "react";
import style from "./AuctionList.module.css";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Image } from "primereact/image";
import { Link } from "react-router-dom";

const image = <Image src="/images/novilha.jpg" />;

const AuctionList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const cows = [
    { name: "Mimosa", price: "R$ 4.000,00", location: "Paranavaí - PR" },
    { name: "Betina", price: "R$ 5.500,00", location: "Nova Esperança - PR" },
    { name: "Gracinha", price: "R$ 5.000,00", location: "Alto Paraná - PR" },
    { name: "Truta", price: "R$ 6.000,00", location: "Alto Paraná - PR" },
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
          <div
            className={`${style["filter-container"]} ${
              showFilters ? `${style["show"]}` : ""
            }`}
          >
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
              <div key={index} className="col-12 lg:col-4">
                <Link to={`/auction/screen`} style={{ textDecoration: "none" }}>
                  <Card
                    title={cow.name}
                    subTitle={cow.price}
                    header={image}
                    className="flex flex-column align-items-center justify-content-center text-center m-2"
                  >
                    <p className="m-0">{cow.location}</p>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuctionList;
