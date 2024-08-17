import React, { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="footer">
      <p>Vitor Tavares &copy; {year}</p>
    </div>
  );
};

export default Footer;
