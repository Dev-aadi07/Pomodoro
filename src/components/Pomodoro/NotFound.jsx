import { Link } from 'react-router-dom';
import '../../styles/NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Oops! Page not found.</p>
      <Link to="/" className="back-home">Go back to focus</Link>
    </div>
  );
}

export default NotFound;
