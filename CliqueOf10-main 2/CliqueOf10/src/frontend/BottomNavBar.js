// BottomNavbar.js
import React, { useState } from "react";
import "./BottomNavBar.css"; // Import your CSS file for styling
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import ChatRoom from "./ChatRoom";
import MatchGroups from "./MatchGroups";

const BottomNavbar = ({ state, setState }) => {
  const [selectedNavItem, setSelectedNavItem] = useState("home");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "chats", label: "Chats" },
    { id: "match-groups", label: "Match Groups" },
    { id: "settings", label: "Settings" },
  ];

  const handleNavItemClick = (navItem) => {
    setSelectedNavItem(navItem);
    // 
  };
  const checkMain = () => {
    switch (selectedNavItem) {
      case "home":
        return <Dashboard />;
      case "settings":
        return <Settings />;
      case "chats":
        return <ChatRoom />;
      case "match-groups":
        return <MatchGroups />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <div className="MainDiv">
     <div className="MainInner"> {checkMain()}</div>
      <div className="bottom-navbar-container">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`bottom-nav-item ${
              selectedNavItem === item.id ? "active" : ""
            }`}
            onClick={() => handleNavItemClick(item.id)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNavbar;
