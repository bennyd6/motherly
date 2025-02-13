import { NavLink } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  return (
    <div className="nav-main">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
        Home
      </NavLink>
      <NavLink to="/chat" className={({ isActive }) => (isActive ? 'active' : '')}>
        Chat
      </NavLink>
      <NavLink to="/analyze" className={({ isActive }) => (isActive ? 'active' : '')}>
        Analyze
      </NavLink>
      <NavLink to="/checkup" className={({ isActive }) => (isActive ? 'active' : '')}>
        Checkup
      </NavLink>
    </div>
  );
}
