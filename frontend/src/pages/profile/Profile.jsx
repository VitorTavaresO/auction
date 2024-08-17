import React from "react";
import "./Profile.css";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { Image } from "primereact/image";

const image = <Image src="/images/novilha.jpg" preview />;

const Profile = () => {
  return (
    <div className="min-h-screen flex justify-content-center bg-gray-400">
      <div className="grid sm:w-full lg:w-10">
        <Card className="col lg:col-4 h-30rem mt-5 mb-5 m-2 flex align-items-center justify-content-center text-center">
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
          <div className="grid m-5 flex flex-column align-items-center justify-content-center text-center">
            <Card
              title="Mimosa"
              subTitle="R$ 5.500,00"
              header={image}
              className="col-12 md:col-6 lg:col-6 lg:w-25rem flex flex-column align-items-center justify-content-center text-center m-2"
            >
              <p className="m-0">Paranavaí - PR</p>
            </Card>
            <Card
              title="Betina"
              subTitle="R$ 5.500,00"
              header={image}
              className="col-12 md:col-6 lg:col-6 lg:w-25rem flex flex-column align-items-center justify-content-center text-center m-2"
            >
              <p className="m-0">Paranavaí - PR</p>
            </Card>
            <Card
              title="Gracinha"
              subTitle="R$ 5.500,00"
              header={image}
              className="col-12 md:col-6 lg:col-6 lg:w-25rem flex flex-column align-items-center justify-content-center text-center m-2"
            >
              <p className="m-0">Paranavaí - PR</p>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
