import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import PropTypes from 'prop-types';

/**
 * The Header component serves as the application's navigation header.
 * It conditionally renders navigation links based on the user's authentication state,
 * which is managed by the AuthContext.
 *
 * @returns {JSX.Element} - The header component.
 */
const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (auth && auth.logout) {
      auth.logout();
      navigate('/');
    }
  };

  return (
    <header className="bg-gray-800 text-white py-4 px-6 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold text-xl" aria-label="Go to Home page">
          Fitness Tracker
        </Link>

        <nav>
          {auth && auth.isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="hover:text-gray-300" aria-label="Go to Dashboard page">
                Dashboard
              </Link>
              <Link to="/goals" className="hover:text-gray-300" aria-label="Go to Goals page">
                Goals
              </Link>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/" className="hover:text-gray-300" aria-label="Go to Home page">
              Home
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func,
};

export default Header;