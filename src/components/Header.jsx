import Button from "./Button";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Header = ({ title, resizing }) => {
  const location = useLocation();
  const h1Ref = useRef(null);
  const divRef = useRef(null);
  const [style, setStyle] = useState({ marginLeft: "50px" });

  useEffect(() => {
    let rect1 = h1Ref.current.getBoundingClientRect();
    let rect2 = divRef.current.getBoundingClientRect();
    console.log(rect1.bottom + " " + rect2.top);
    setStyle({
      marginLeft:
        Math.round(rect1.bottom) === Math.round(rect2.top) ? "0px" : "50px"
    });
  }, [resizing]);

  console.log(style);
  //setInterval(repos, 100);

  return (
    <div className="header">
      <h1 ref={h1Ref}>{title}</h1>
      <div ref={divRef} style={style}>
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