import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <h4>Version 1.0.0</h4>
      {/*<a href="/">Go back</a>*/}
      <Link to="/">Go back</Link>
    </>
  );
};

export default About;
