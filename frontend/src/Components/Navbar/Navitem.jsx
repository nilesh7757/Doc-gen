import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className="relative inline-block px-2 py-1 group"
    >
      {/* Text */}
      <span className={`relative transition-colors duration-300 group-hover:text-black ${
        isActive ? "text-blue-600 font-semibold" : "text-gray-700"
      }`}>
        {label}
        {/* Animated underline */}
        <span className={`absolute rounded-full left-0 -bottom-1 h-[2px] transition-all duration-300 ${
          isActive 
            ? "w-full bg-blue-600" 
            : "w-0 bg-black group-hover:w-full"
        }`}></span>
      </span>
    </Link>
  );
};

export default NavItem;
