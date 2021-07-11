import Button from './Button';
import { useLocation, Link } from 'react-router-dom';

const Header = ({ title }) => {
  const location = useLocation();

  return (
    <div className="header">
      <h1>{title}</h1>
      <div>
        {location.pathname === '/' && (
          <Button text="Start" colour="green" onClick={() => {}} />
        )}
        {location.pathname === '/' && (
          <Link to="./Players">
            <Button text="Players" colour="blue" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
