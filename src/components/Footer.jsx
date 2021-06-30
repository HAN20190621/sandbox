import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <p>Copyright &copy; {new Date().getFullYear()}</p>
        <Link to="/About">About</Link>
        {/* <a href="/About">About</a> */}
      </footer>
    </>
  );
};

export default Footer;
