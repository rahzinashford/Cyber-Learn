import React, { useState } from "react";
import "../styles/navbar.css";
import { useToast } from "./ui/Toast";

const Navbar = ({ onOpenAuth, onOpenPopup }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to true to show the profile button
  const { addToast } = useToast();

  const handleNotificationClick = () => {
    addToast("SYSTEM_ALERT: Neural link synchronized successfully.", "info");
    setTimeout(() => {
      addToast("SECURITY_PING: Encrypted handshake completed.", "info");
    }, 2000);
  };

  const handlePopupClick = (type) => {
    onOpenPopup(type);
    setIsProfileOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo cursor-pointer" data-testid="link-home" onClick={() => window.location.href = "/"}>
          <span className="material-symbols-outlined icon">shield</span>
          <span>CyberLearn</span>
        </div>

        <div className="navbar-actions">
          <ul className="navbar-links">
            <li>
              <a href="/#about">About</a>
            </li>
            <li>
              <a href="/#features">Features</a>
            </li>
            <li>
              <a href="/#modules">Modules</a>
            </li>
          </ul>

          <div className="nav-controls">
            <button
              className="nav-icon-btn"
              aria-label="Notifications"
              data-testid="button-notifications"
              onClick={handleNotificationClick}
            >
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
                <span className="material-symbols-outlined">
                  account_circle
                </span>
              </button>

              {isProfileOpen && (
                <div
                  className="profile-dropdown neon-border"
                  data-testid="dropdown-profile"
                >
                  <div
                    className="dropdown-item cursor-pointer"
                    onClick={() => handlePopupClick("profile")}
                    data-testid="link-profile"
                  >
                    <span className="material-symbols-outlined">person</span>
                    <span>Profile</span>
                  </div>
                  <div
                    className="dropdown-item cursor-pointer"
                    onClick={() => handlePopupClick("community")}
                    data-testid="link-community"
                  >
                    <span className="material-symbols-outlined">groups</span>
                    <span>Community</span>
                  </div>
                  <div
                    className="dropdown-item cursor-pointer"
                    onClick={() => handlePopupClick("platform")}
                    data-testid="link-courses"
                  >
                    <span className="material-symbols-outlined">menu_book</span>
                    <span>Courses</span>
                  </div>
                  <div
                    className="dropdown-item cursor-pointer"
                    onClick={() => handlePopupClick("references")}
                    data-testid="link-references"
                  >
                    <span className="material-symbols-outlined">
                      library_books
                    </span>
                    <span>References</span>
                  </div>
                  <div
                    className="dropdown-item cursor-pointer"
                    onClick={() => handlePopupClick("settings")}
                    data-testid="link-settings"
                  >
                    <span className="material-symbols-outlined">settings</span>
                    <span>Settings</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item logout"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsProfileOpen(false);
                    }}
                    data-testid="button-logout"
                  >
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
                style={{ fontSize: "0.8rem", marginLeft: "1rem" }}
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
