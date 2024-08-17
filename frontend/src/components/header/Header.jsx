import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { Menubar } from "primereact/menubar";

const Header = () => {
  const items = [
    {
      label: "Leilões",
      icon: "pi pi-fw pi-hammer",
      command: () => {
        window.location = "/about";
      },
    },
    {
      label: "Home",
      template: () => (
        <img
          src={"./images/logo.png"}
          alt="Home Icon"
          style={{ width: "150px", height: "100px" }}
        />
      ),
      command: () => {
        window.location = "/";
      },
    },
    {
      label: "Contact",
      icon: "pi pi-fw pi-envelope",
      command: () => {
        window.location = "/contact";
      },
    },
  ];
  return (
    <>
      <Menubar
        className="menubar-custom justify-content-center bg-gray-800 border-gray-800"
        model={items}
      />
    </>
  );
};

export default Header;
