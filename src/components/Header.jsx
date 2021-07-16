import Button from "./Button";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const Header = ({ title, resizing }) => {
  const location = useLocation();

  useEffect(() => {});

  return (
    <div className="header">
      <h1>{title}</h1>
      <div style={{ marginLeft: resizing ? 0 : 50 }}>
        {location.pathname === "/" && (
          <Button text="Start" colour="green" onClick={() => {}} />
        )}
        {location.pathname === "/" && (
          <Link to="./Players">
            <Button text="Players" colour="blue" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
