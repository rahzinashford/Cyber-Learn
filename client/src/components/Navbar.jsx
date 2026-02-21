import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '../styles/navbar.css';

const Navbar = ({ onOpenAuth }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to true to show the profile button
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/">
          <div className="navbar-logo cursor-pointer" data-testid="link-home">
            <span className="material-symbols-outlined icon">shield</span>
            <span>CyberLearn</span>
          </div>
        </Link>
        
        <div className="navbar-actions">
          <ul className="navbar-links">
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#modules">Modules</a></li>
          </ul>

          <div className="nav-controls">
            <button className="nav-icon-btn" aria-label="Notifications" data-testid="button-notifications">
              <span className="material-symbols-outlined">notifications</span>
              <span className="notification-badge"></span>
            </button>

            <div className="profile-container">
              <button 
                className="nav-icon-btn profile-trigger" 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-label="Profile Menu"
                data-testid="button-profile-menu"
              >
                <span className="material-symbols-outlined">account_circle</span>
              </button>

              {isProfileOpen && (
                <div className="profile-dropdown neon-border" data-testid="dropdown-profile">
                  <Link to="/profile" className="dropdown-item" onClick={() => setIsProfileOpen(false)} data-testid="link-profile">
                    <span className="material-symbols-outlined">person</span>
                    <span>Profile</span>
                  </Link>
                  <Link to="/community" className="dropdown-item" onClick={() => setIsProfileOpen(false)} data-testid="link-community">
                    <span className="material-symbols-outlined">groups</span>
                    <span>Community</span>
                  </Link>
                  <Link to="/courses" className="dropdown-item" onClick={() => setIsProfileOpen(false)} data-testid="link-courses">
                    <span className="material-symbols-outlined">menu_book</span>
                    <span>Courses</span>
                  </Link>
                  <Link to="/references" className="dropdown-item" onClick={() => setIsProfileOpen(false)} data-testid="link-references">
                    <span className="material-symbols-outlined">library_books</span>
                    <span>References</span>
                  </Link>
                  <Link to="/settings" className="dropdown-item" onClick={() => setIsProfileOpen(false)} data-testid="link-settings">
                    <span className="material-symbols-outlined">settings</span>
                    <span>Settings</span>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout" onClick={() => { setIsLoggedIn(false); setIsProfileOpen(false); }} data-testid="button-logout">
                    <span className="material-symbols-outlined">logout</span>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {!isLoggedIn && (
              <button 
                className="text-btn highlight" 
                onClick={onOpenAuth}
                style={{ fontSize: '0.8rem', marginLeft: '1rem' }}
                data-testid="button-login"
              >
                LOGIN
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
