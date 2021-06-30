import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer> Copyright &copy; {new Date().getFullYear()} </footer>
      {/* <a href="/About">About</a> */}
      <Link to="/About">About</Link>
    </>
  );
};

export default Footer;
