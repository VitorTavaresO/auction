import React from "react";
import "./Header.css";
import { Menubar } from "primereact/menubar";

const Header = () => {
  const items = [
    {
      label: "Leilões",
      icon: "pi pi-fw pi-hammer",
      command: () => {
        window.location = "/auction-list";
      },
    },
    {
      label: (
        <div className="menu-item-label">
          <i className="pi pi-fw pi-home mobile-only"></i>
          <img
            src={"./images/logo.png"}
            alt="Home Icon"
            className="menubar-logo desktop-only"
            style={{ width: "150px", height: "100px" }}
          />
          <span className="mobile-only ml-2"> Home</span>
        </div>
      ),
      command: () => {
        window.location = "/";
      },
    },
    {
      label: "Perfil",
      icon: "pi pi-fw pi-user",
      command: () => {
        window.location = "/profile";
      },
    },
    {
      label: "Logout",
      icon: "pi pi-fw pi-sign-out",
      command: () => {
        localStorage.removeItem("token");
        window.location = "/login";
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
