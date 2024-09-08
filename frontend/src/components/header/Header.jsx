import React from "react";
import { useRef } from "react";
import "./Header.css";
import { Menubar } from "primereact/menubar";
import { OverlayPanel } from "primereact/overlaypanel";
import { useTranslation } from "react-i18next";

const Header = () => {
  const overlayPanelRef = useRef(null);

  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const rightItems = (
    <div className="flex align-items-center">
      <div
        className="flex align-items-center"
        onClick={(e) => overlayPanelRef.current.toggle(e)}
        style={{ cursor: "pointer", color: "#ffd700", marginRight: "10px" }}
      >
        <i className="pi pi-fw pi-globe" />
      </div>

      <div
        className="flex align-items-center"
        onClick={() => {
          localStorage.removeItem("token");
          window.location = "/login";
        }}
        style={{ cursor: "pointer", color: "#ffd700", marginLeft: "10px" }}
      >
        <i className="pi pi-fw pi-sign-out" />
      </div>
    </div>
  );

  const centerItems = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location = "/";
      },
    },
    {
      label: t("header.auctions"),
      icon: "pi pi-fw pi-hammer",
      command: () => {
        window.location = "/auction-list";
      },
    },
    {
      label: t("header.profile"),
      icon: "pi pi-fw pi-user",
      command: () => {
        window.location = "/profile";
      },
    },
  ];

  return (
    <>
      <Menubar
        className="menubar-custom justify-content-center bg-gray-800 border-gray-800"
        model={centerItems}
        end={rightItems}
      />
      <OverlayPanel ref={overlayPanelRef} dismissable>
        <div
          onClick={() => changeLanguage("en")}
          className="overlay-item w-full"
        >
          English
        </div>
        <div
          onClick={() => changeLanguage("pt")}
          className="overlay-item w-full"
        >
          Português
        </div>
      </OverlayPanel>
    </>
  );
};

export default Header;
