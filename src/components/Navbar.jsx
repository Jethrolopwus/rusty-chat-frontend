"use client";
import React, { useState } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-blue-600">
                    RustyChat
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-blue-600 hover:text-purple-600 font-semibold transition-colors "
              >
                Home
              </Link>

              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href={"/login"}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200">
                Sign In
              </button>
            </Link>
            <Link href={"/register"}>
              <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200">
                Register
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#home"
              className="block px-3 py-2 text-blue-600 font-semibold"
            >
              Home
            </a>
            <a
              href="#features"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-semibold"
            >
              Features
            </a>
            <a
              href="#about"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-semibold"
            >
              About
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-semibold"
            >
              Contact
            </a>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="space-y-2">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200">
                  Sign In
                </button>
                <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
