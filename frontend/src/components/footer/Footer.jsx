import React, { useState, useEffect } from "react";
import "./Footer.css";
import { Card } from "primereact/card";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <Card className="footer-card flex justify-content-center text-center bg-gray-800 border-gray-800">
      <p>Vitor Tavares &copy; {year}</p>
    </Card>
  );
};

export default Footer;
