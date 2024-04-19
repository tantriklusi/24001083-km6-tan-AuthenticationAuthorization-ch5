import React from "react";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    // Footer component
    <footer className="bg-dark text-light py-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            {/* Logo */}
            <a
              href="/"
              className="text-danger text-lg font-bold"
              style={{
                fontSize: "28px",
                color: "#990000",
                borderBottom: "2px solid #990000",
              }}
            >
              TVidio
            </a>
            {/* Copyright */}
            <small className="block text-muted" style={{ fontSize: "18px", color: "white" }}>
              © {new Date().getFullYear()} TVidio, All rights reserved.
            </small>
          </div>
          <div className="flex">
            {/* Icon Instagram */}
            <BsInstagram href="#" className="text-light" style={{ fontSize: "28px", color: "white" }} />
            <p className="text-white px-2 font-semibold"> TVidio.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
