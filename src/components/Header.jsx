import Button from "./Button";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Header = ({ title, resizing }) => {
  const location = useLocation();
  const h1Ref = useRef(null);
  const [minWidth, setMinWidth] = useState(0);
  //const [style, setStyle] = useState({ marginLeft: "0" });

  useEffect(() => {
    let rect1 = h1Ref.current.getBoundingClientRect();
    setMinWidth((prevValue) => {
      if (prevValue === 0) return rect1.width;
    });
  }, []);

  useEffect(() => {
    let rect1 = h1Ref.current.getBoundingClientRect();
    console.log(rect1.height + " " + minWidth);
  }, [resizing, minWidth]);

  return (
    <div className="header">
      <h1 ref={h1Ref}>{title}</h1>
      <div>
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
