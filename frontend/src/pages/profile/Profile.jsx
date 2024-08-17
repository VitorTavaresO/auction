import React from "react";
import "./Profile.css";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="min-h-screen flex justify-content-center bg-gray-400">
      <div className="grid sm:w-full lg:w-8">
        <Card className="sm:col-fixed sm:w-25rem col-fixed w-full h-30rem mt-5 mb-5 m-2 flex align-items-center justify-content-center text-center">
          <Avatar
            image="/images/teste.jpg"
            shape="circle"
            className="w-9rem h-9rem"
          />
          <h1 className="">Vitor Tavares</h1>
          <h2>Vendendor</h2>
          <h3 className="stars">
            <i className="pi pi-star-fill m-1"></i>
            <i className="pi pi-star-fill m-1"></i>
            <i className="pi pi-star-fill m-1"></i>
            <i className="pi pi-star-fill m-1"></i>
            <i className="pi pi-star-fill m-1"></i>
          </h3>
          <h3>
            <i className="pi pi-phone m-1"></i>
            (44) 999756-5777
          </h3>
          <h4>
            <i className="pi pi-envelope m-1"></i>
            vtavares.eng@gmail.com
          </h4>
          <h3>
            <i className="pi pi-map-marker m-1"></i>
            Paranavaí - PR
          </h3>
        </Card>
        <Card className="col h-auto mt-5 mb-5 m-2 flex align-items-top justify-content-center text-center">
          <div className="p-inputgroup">
            <Link className="p-inputgroup-addon">
              <span>
                <i className="pi pi-search"></i>
              </span>
            </Link>
            <InputText placeholder="Busca" className="w-full" />
            <Link className="p-inputgroup-addon">
              <span>
                <i className="pi pi-filter-fill"></i>
              </span>
            </Link>
          </div>
          <Card className="col h-25rem mt-5 mb-5 m-2 flex align-items-top justify-content-center text-center"></Card>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
