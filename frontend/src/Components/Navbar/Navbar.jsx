import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import NavItem from "./Navitem";
import { User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isSignedIn = false; // mock auth state

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/document-analyser", label: "Document Analyser" },
    { to: "/document-creation", label: "Document Creation" },
    { to: "/lawyer-connect", label: "Lawyer Connect" },
    { to: "/my-documents", label: "My Documents" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="fixed rounded-xl mx-2 sm:mx-3 md:mx-4 top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-gray-800">
            AdvocAI
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-4 md:space-x-8 text-gray-700 hover:text-black font-medium">
            {navLinks.map((link, index) => (
              <NavItem key={index} to={link.to} label={link.label} />
            ))}
          </div>

          {/* Desktop Auth/Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer">
                <User className="w-6 h-6 text-gray-700" />
              </button>
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  className="px-4 outline-1 rounded-lg hover:bg-black hover:text-white cursor-pointer"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-md hover:bg-gray-200"
            >
              <Menu className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar (Mobile Only) */}
      <div
        className={`fixed top-0 -right-2 h-min w-64 rounded-xl m-2 bg-white shadow-xl transform transition-transform duration-300 z-60 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-xl font-bold text-gray-800">AdvocAI</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md hover:bg-gray-200"
          >
            <X className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Sidebar Nav Links */}
        <div className="flex flex-col p-4 space-y-4 text-gray-700 font-medium">
          {navLinks.map((link, index) => (
            <div 
            key={index}
            onClick={() => setIsOpen(false)}>
              <NavItem to={link.to} label={link.label} />
            </div>
          ))}
        </div>

        {/* Sidebar Auth/Profile */}
        <div className="p-4 border-t mt-auto">
          {isSignedIn ? (
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer">
              <User className="w-6 h-6 text-gray-700" />
            </button>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button
                variant="outline"
                className="w-full outline-1 rounded-lg hover:bg-black hover:text-white cursor-pointer"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Background overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
