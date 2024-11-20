import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-column justify-content-between min-h-screen bg-gray-700 text-yellow-500">
      <div className="flex flex-column align-items-center justify-content-center flex-grow-1 p-5">
        <h1 className="text-6xl mb-4">{t("error.404")}</h1>
        <h2 className="text-6xl mb-4">{t("error.404Message")}</h2>
        <Link to="/" className="text-yellow-500 text-2xl">
          {t("error.back")}
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
