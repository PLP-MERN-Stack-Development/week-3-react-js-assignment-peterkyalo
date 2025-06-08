import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // Ensure this path is correct
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // This check is important. If `useTheme` is not working, it means the context is not provided correctly.
  if (!toggleTheme) {
    console.error("ThemeContext is not provided! Make sure Navbar is wrapped in ThemeProvider.");
    // Return a fallback or null to prevent crashing
    return null; 
  }

  const activeLinkClass = "text-blue-500 dark:text-blue-400";
  const inactiveLinkClass = "hover:text-blue-500 dark:hover:text-blue-400 transition-colors";
  
  const closeMobileMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="font-bold text-xl text-blue-600 dark:text-blue-400">
              Task Manager App
            </NavLink>
          </div>

          {/* Right Side: Desktop Menu & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Desktop Menu Links */}
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
            >
              Task Manager
            </NavLink>
            <NavLink 
              to="/api"
              className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
            >
              API Data
            </NavLink>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <MoonIcon className="h-6 w-6 text-gray-700" />
              ) : (
                <SunIcon className="h-6 w-6 text-yellow-400" />
              )}
            </button>
          </div>

          {/* Mobile: Hamburger Button */}
          <div className="md:hidden flex items-center">
             {/* We can also put the theme toggle here for mobile view if desired */}
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <MoonIcon className="h-6 w-6 text-gray-700" />
              ) : (
                <SunIcon className="h-6 w-6 text-yellow-400" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink 
              to="/" 
              onClick={closeMobileMenu}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
              }
            >
              Task Manager
            </NavLink>
            <NavLink 
              to="/api"
              onClick={closeMobileMenu}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
              }
            >
              API Data
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;